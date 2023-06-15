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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const jwt_manager_1 = require("../auth/jwt/jwt.manager");
const room_service_1 = require("./room.service");
let RoomController = class RoomController {
    constructor(roomService, jwtManager) {
        this.roomService = roomService;
        this.jwtManager = jwtManager;
    }
    async getRoomDetails(roomId, req) {
        let result = await this.roomService.getRoomDetails(roomId).catch((err) => {
            throw err;
        });
        return result;
    }
    async getRoomMessages(roomId, req) {
        let result = await this.roomService.getRoomMessages(roomId).catch((err) => {
            throw err;
        });
        return result;
    }
    async getUserRooms(userId, req) {
        let rooms = await this.roomService.getUserRooms(userId).catch((err) => {
            throw err;
        });
        return rooms;
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('details/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomDetails", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('messages/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomMessages", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getUserRooms", null);
RoomController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [room_service_1.RoomService, jwt_manager_1.JwtManager])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map