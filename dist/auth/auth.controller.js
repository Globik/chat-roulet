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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const createUser_dto_1 = require("./dto/createUser.dto");
const signIn_dto_1 = require("./dto/signIn.dto");
const jwt_auth_guard_1 = require("./jwt/jwt-auth.guard");
const vk_auth_guard_1 = require("./oauth20/vk.oauth20/vk-auth.guard");
const signInWithVk_dto_1 = require("./dto/signInWithVk.dto");
const signInWithYandex_dto_1 = require("./dto/signInWithYandex.dto");
const signInWithGoogle_dto_1 = require("./dto/signInWithGoogle.dto");
const adminRegister_dto_1 = require("./dto/adminRegister.dto");
const adminLogin_dto_1 = require("./dto/adminLogin.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(createUserDto) {
        let result = await this.authService.createUser(createUserDto).catch((e) => {
            throw e;
        });
        return { userId: result };
    }
    async signIn(signInDto) {
        let result = await this.authService.signin(signInDto).catch((e) => {
            throw e;
        });
        return result;
    }
    async updateRefreshToken(refresh_token) {
        let result = await this.authService.updateRefreshToken(refresh_token).catch((e) => {
            throw e;
        });
        return {
            access_token: result.access_token,
            expires: result.expires,
            refresh_token: result.refresh_token,
            refresh_token_expires: result.refresh_token_expires
        };
    }
    async signInsWithVk(res) { }
    async signInWithVkRedirect(req) {
        return this.authService.signInWithVkontakte(req).catch((e) => {
            throw e;
        });
    }
    async adminLogin(dto) {
        return this.authService.adminLogin(dto).catch((e) => {
            throw e;
        });
    }
    async adminRegister(dto) {
        return this.authService.adminRegister(dto).catch((e) => {
            throw e;
        });
    }
    async signInWithVk(dto) {
        return this.authService.signInWithVkontakte(dto).catch((e) => {
            throw e;
        });
    }
    async signInWithYandex(dto) {
        return this.authService.signInWithYandex(dto).catch((e) => {
            throw e;
        });
    }
    async signInWithGoogle(dto) {
        return this.authService.signInWithGoogle(dto).catch((e) => {
            throw e;
        });
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('update-refresh-token'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateRefreshToken", null);
__decorate([
    (0, common_1.UseGuards)(vk_auth_guard_1.VkAuthGuard),
    (0, common_1.Get)("vk/login"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInsWithVk", null);
__decorate([
    (0, common_1.UseGuards)(vk_auth_guard_1.VkAuthGuard),
    (0, common_1.Get)("vk/redirect"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithVkRedirect", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("admin/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminLogin_dto_1.AdminLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("admin/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adminRegister_dto_1.AdminRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminRegister", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("vk-oauth"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signInWithVk_dto_1.SignInWithVkDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithVk", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("yandex-oauth"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signInWithYandex_dto_1.SignInWithYandexDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithYandex", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("google-oauth"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signInWithGoogle_dto_1.SignInWithGoogleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithGoogle", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map