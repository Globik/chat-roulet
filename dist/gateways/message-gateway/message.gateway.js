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
exports.MessageGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const newMessage_dto_1 = require("./dto/newMessage.dto");
let MessageGateway = class MessageGateway {
    constructor() {
        this.logger = new common_1.Logger('MessageGateway');
    }
    async onSendMessage(messageDto, socket, req) {
        if (!socket.rooms.has(messageDto.roomId)) {
            this.server.to(socket.id).emit('onException', {
                statusCode: 403,
                message: 'Пользователь не состоит в чате'
            });
        }
        this.server.to(messageDto.roomId).emit('onNewMessage', {
            message: messageDto
        });
    }
    onModuleInit() {
        this.server.on('connection', socket => {
            this.logger.log(`Клиент ${socket.id} был подключен`);
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newMessage_dto_1.NewMessageDto, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "onSendMessage", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map