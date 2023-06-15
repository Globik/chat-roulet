"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const room_gateway_service_1 = require("./room.gateway.service");
const findNewRoom_dto_1 = require("./dto/findNewRoom.dto");
const user_service_1 = require("../../user/user.service");
const leaveRoom_dto_1 = require("./dto/leaveRoom.dto");
let RoomGateway = class RoomGateway {
    constructor(gatewayService, userService) {
        this.gatewayService = gatewayService;
        this.userService = userService;
        this.queue = [];
        this.q = new Map();
    }
    async handleConnection(socket) {
        this.q.set(socket.id, { socketId: socket.id, isBusy: true });
    }
    async handleDisconnect(socket) {
        let a = this.q.get(socket.id);
        if (a) {
            if (a.partner) {
                this.server.to(a.partner).emit('onLeaveRoom', {
                    membersId: a.partner,
                    roomId: socket.id
                });
                const memberSocket = this.server.sockets.sockets.get(socket.id);
                if (memberSocket)
                    memberSocket.leave(a.roomId);
                const memberSocket2 = this.server.sockets.sockets.get(a.partner);
                if (memberSocket2)
                    memberSocket2.leave(a.roomId);
            }
        }
        this.q.delete(socket.id);
    }
    async joinToQueue(dto, socket) {
        let user = await this.userService.getUserById(dto.userId).catch((e) => {
            console.log(e.message);
            this.server.to(socket.id).emit('onException', {
                statusCode: e.status,
                message: e.message
            });
            stop();
        });
        let q = this.q.has(socket.id);
        if (q) {
            let a = this.q.get(socket.id);
            a.userId = dto.userId;
            a.gender = dto.gender;
            a.country = dto.country;
            a.isBusy = false;
        }
        socket.emit("onJoinToQueue", {
            status: "OK"
        });
    }
    async findNewRoom(dto, socket) {
        let mapToArray = [...this.q.values()];
        console.log("*** ARR *** ", mapToArray);
        let filter = mapToArray.filter(u => u.country === dto.country
            && u.gender === dto.gender
            && u.socketId !== socket.id
            && !u.isBusy);
        let random;
        if (filter.length) {
            console.log("length");
            random = filter[Math.floor(Math.random() * filter.length)];
        }
        if (!random) {
            filter = mapToArray.filter(queue => (queue.country === dto.country
                || queue.gender === dto.gender)
                && queue.socketId !== socket.id
                && !queue.isBusy);
        }
        if (filter.length) {
            random = filter[Math.floor(Math.random() * filter.length)];
        }
        if (!random) {
            filter = mapToArray.filter(queue => !queue.isBusy && queue.socketId !== socket.id);
        }
        if (filter.length) {
            random = filter[Math.floor(Math.random() * filter.length)];
        }
        if (!random) {
            return;
        }
        let myqueue = this.q.get(socket.id);
        let roomId = await this.gatewayService.create([dto.userId, random.userId]).catch((e) => {
            this.server.to(socket.id).emit('onException', {
                statusCode: e.status,
                message: e.message
            });
            stop();
        });
        socket.join(roomId);
        if (myqueue) {
            myqueue.isBusy = true;
            myqueue.partner = random.socketId;
        }
        const partnerSocket = this.server.sockets.sockets.get(random.socketId);
        if (partnerSocket)
            partnerSocket.join(roomId);
        let abba = this.q.get(random.socketId);
        if (abba) {
            abba.isBusy = true;
            abba.partner = socket.id;
        }
        this.server.to(random.socketId).emit("waitOffer", { from: socket.id, roomId: roomId, gender: dto.gender, country: dto.country });
        this.server.to(socket.id).emit("makeOffer", { to: random.socketId, roomId: roomId, gender: random.gender, country: random.country });
    }
    async onBye(socket) {
        let q = this.q.get(socket.id);
        if (q) {
            q.isBusy = true;
            q.partner = undefined;
        }
    }
    async onLeaveRoom(dto, socket) {
        await this.gatewayService.leave(dto).catch((e) => {
            this.server.to(socket.id).emit('onException', {
                statusCode: e.status,
                message: e.message
            });
            stop();
        });
        this.server.to(dto.membersId).emit('onLeaveRoom', {
            membersId: dto.membersId,
        });
        const memberSocket = this.server.sockets.sockets.get(socket.id);
        if (memberSocket)
            memberSocket.leave(dto.roomId);
        let q = this.q.get(dto.to);
        if (q) {
            q.partner = undefined;
            q.isBusy = false;
        }
        let a = this.q.get(dto.membersId.toString());
        if (a) {
            a.partner = undefined;
            a.isBusy = false;
        }
    }
    handleOffer(data) {
        this.server.to(data.roomId).emit('offer', data.offer);
    }
    handleAnswer(data) {
        this.server.to(data.roomId).emit('answer', data.answer);
    }
    handleIceCandidate(data) {
        this.server.to(data.roomId).emit('iceCandidate', data.candidate);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinToQueue'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findNewRoom_dto_1.FindNewRoomDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "joinToQueue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findNewRoom_dto_1.FindNewRoomDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "findNewRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('bye'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onBye", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leaveRoom_dto_1.LeaveRoomDto, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('offer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleOffer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('answer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('iceCandidate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleIceCandidate", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [room_gateway_service_1.RoomGatewayService,
        user_service_1.UserService])
], RoomGateway);
exports.RoomGateway = RoomGateway;
//# sourceMappingURL=room.gateway.js.map