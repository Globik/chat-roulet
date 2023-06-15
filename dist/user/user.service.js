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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const roles_1 = require("../common/permissions-manager/roles");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserById(userId) {
        let user = await this.userModel.findById(userId).catch(e => {
            console.log(e.message);
            throw new common_1.BadRequestException("Неверный id");
        });
        if (!user)
            throw new common_1.NotFoundException('Пользователь не найден');
        return user;
    }
    async getAll(queue) {
        let users = await this.userModel.find();
        let usersVM = [];
        users.forEach((user) => {
            const item = queue.find(item => item.userId === user.id);
            if (!user.blocked) {
                usersVM.push({
                    id: user.id,
                    username: user.username,
                    fullname: `${user.lastname} ${user.firstname}`,
                    isActive: item ? true : false
                });
            }
        });
        return usersVM;
    }
    async getBlocked() {
        let users = await this.userModel.find();
        let usersVM = [];
        users.forEach((user) => {
            if (user.blocked) {
                usersVM.push({
                    id: user.id,
                    username: user.username,
                    fullname: `${user.lastname} ${user.firstname}`,
                    reason: user.reason,
                    lockdownEnd: user.lockdownEnd
                });
            }
        });
        return usersVM;
    }
    async getOnline(queue) {
        let busy = queue.filter(item => item.isBusy).length;
        let online = queue.length;
        return {
            busy,
            online
        };
    }
    async getDetails(userId, host) {
        let user = await this.getUserById(userId);
        let result = {
            id: user.id,
            username: user.username,
            fullname: `${user.lastname} ${user.firstname}`,
            role: user.role,
            email: user.email,
            gender: user.gender,
            country: user.country,
            blocked: user.blocked
        };
        return result;
    }
    async updateUsername(updateUsernameDto) {
        let user = await this.getUserById(updateUsernameDto.userId);
        user.username = updateUsernameDto.newUserName;
        user.save();
    }
    async block(dto) {
        let user = await this.getUserById(dto.userId);
        const judge = await this.getUserById(dto.judgeId);
        if (judge.role !== roles_1.Roles.ADMINISTRATOR)
            throw new common_1.ForbiddenException("Вы не являетесь администратором");
        user.lockdownEnd = dto.lockdownEnd;
        user.blocked = true;
        user.reason = dto.reason;
        await user.save();
    }
    async unBlock(dto) {
        let user = await this.getUserById(dto.userId);
        const judge = await this.getUserById(dto.judgeId);
        if (judge.role !== roles_1.Roles.ADMINISTRATOR)
            throw new common_1.ForbiddenException("Вы не являетесь администратором");
        user.lockdownEnd = null;
        user.blocked = false;
        user.reason = null;
        await user.save();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map