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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
const updateUsername_dto_1 = require("./dto/updateUsername.dto");
const user_service_1 = require("./user.service");
const block_user_dto_1 = require("./dto/block-user.dto");
const unblock_user_dto_1 = require("./dto/unblock-user.dto");
const room_gateway_1 = require("../gateways/room-gateway/room.gateway");
let UserController = class UserController {
    constructor(userService, roomGateway) {
        this.userService = userService;
        this.roomGateway = roomGateway;
    }
    async getDetails(userId, req) {
        let result = await this.userService.getDetails(userId).catch((err) => {
            throw err;
        });
        return result;
    }
    async getUsers() {
        let users = await this.userService.getAll(this.roomGateway.queue).catch((err) => {
            throw err;
        });
        return users;
    }
    async getBlocked() {
        let users = await this.userService.getBlocked().catch((err) => {
            throw err;
        });
        return users;
    }
    async getOnline() {
        let users = await this.userService.getOnline(this.roomGateway.queue).catch((err) => {
            throw err;
        });
        return users;
    }
    async updateUsername(updateUsernameDto) {
        await this.userService.updateUsername(updateUsernameDto).catch((err) => {
            throw err;
        });
    }
    async block(dto) {
        await this.userService.block(dto).catch((err) => {
            throw err;
        });
    }
    async unblock(dto) {
        await this.userService.unBlock(dto).catch((err) => {
            throw err;
        });
    }
};
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Get)('/:id'),
    __param(0, (0, decorators_1.Param)('id')),
    __param(1, (0, decorators_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDetails", null);
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Get)('details/blocked'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getBlocked", null);
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Get)('details/online'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOnline", null);
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Put)('details/username'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUsername_dto_1.UpdateUsernameDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsername", null);
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Post)('block'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [block_user_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "block", null);
__decorate([
    (0, decorators_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Post)('unblock'),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unblock_user_dto_1.UnblockUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unblock", null);
UserController = __decorate([
    (0, decorators_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        room_gateway_1.RoomGateway])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map