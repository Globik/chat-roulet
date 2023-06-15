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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const jwt = require("jsonwebtoken");
const exceptions_1 = require("@nestjs/common/exceptions");
let WsGuard = class WsGuard {
    constructor(userService) {
        this.userService = userService;
    }
    canActivate(context) {
        const bearerToken = context.args[0].handshake.headers.authorization.split(' ')[1];
        console.log("asd");
        try {
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
            return new Promise((resolve, reject) => {
                return this.userService.getUserById(decoded.userid).then(user => {
                    if (user) {
                        resolve(user);
                    }
                    else {
                        reject(false);
                    }
                }).catch((err) => context.args[0].emit('onException', err));
            });
        }
        catch (ex) {
            context.args[0].emit('onException', new exceptions_1.UnauthorizedException('Пользователь не авторизован'));
            return false;
        }
    }
};
WsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], WsGuard);
exports.WsGuard = WsGuard;
//# sourceMappingURL=ws.guard.js.map