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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const bcrypt = require("bcrypt");
const jwt_manager_1 = require("./jwt/jwt.manager");
const roles_1 = require("../common/permissions-manager/roles");
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        let entity = await this.userModel.findOne({ username: createUserDto.username } || { email: createUserDto.email });
        if (entity !== null)
            throw new common_1.BadRequestException('Пользователь уже существует');
        createUserDto.password = await this.passwordHash(createUserDto.password);
        let user = await this.userModel.create(createUserDto);
        user.refreshHash = await this.passwordHash(createUserDto.email);
        await user.save();
        return user.id;
    }
    async isBlocked(user) {
        if (user.blocked) {
            const lockdownEnd = user.lockdownEnd;
            if (lockdownEnd < Date.now()) {
                user.lockdownEnd = null;
                user.blocked = false;
                user.reason = null;
                await user.save();
                return false;
            }
            else
                return true;
        }
        else
            return false;
    }
    async signin(loginDto) {
        let user = await this.userModel.findOne({ username: loginDto.username });
        if (user === null)
            throw new common_1.NotFoundException('Пользователь не найден');
        const isBlocked = await this.isBlocked(user);
        if (isBlocked)
            throw new common_1.ForbiddenException(JSON.stringify({ lockdownEnd: user.lockdownEnd, reason: user.reason }));
        if (loginDto.authStrategy === "jwt" && !await this.passwordValidate(loginDto.password, user.password))
            throw new common_1.BadRequestException('Неверный пароль');
        let tokenResult = new jwt_manager_1.JwtManager().generateAccessToken(user);
        let refresh_token = null;
        let refresh_token_expires = null;
        if (loginDto.rememberMe) {
            let result = await new jwt_manager_1.JwtManager().generateRefreshToken(user.id, user.refreshHash);
            refresh_token = result.refresh_token;
            refresh_token_expires = result.expires;
        }
        return {
            userId: user.id,
            access_token: tokenResult.access_token,
            expires: tokenResult.expires,
            refresh_token: refresh_token,
            refresh_token_expires: refresh_token_expires
        };
    }
    async updateRefreshToken(refreshToken) {
        let tokenInfo = null;
        try {
            tokenInfo = new jwt_manager_1.JwtManager().parseToken(refreshToken);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
        let user = await this.userModel.findById(tokenInfo.userId);
        if (user === null)
            throw new common_1.NotFoundException('Пользователь не найден');
        let tokenResult = new jwt_manager_1.JwtManager().generateAccessToken(user);
        let refreshTokenResult = await new jwt_manager_1.JwtManager().generateRefreshToken(user.id, user.refreshHash);
        return {
            access_token: tokenResult.access_token,
            expires: tokenResult.expires,
            refresh_token: refreshTokenResult.refresh_token,
            refresh_token_expires: refreshTokenResult.expires
        };
    }
    async signInWithGoogle(dto) {
        if (!dto)
            throw new common_1.BadRequestException();
        let user = await this.userModel.findOne({ googleId: dto.googleId });
        if (user)
            return this.signin({ username: user.username, password: "", rememberMe: false, authStrategy: "google" });
        user = await this.userModel.findOne({ email: dto.email });
        if (user) {
            throw new common_1.ForbiddenException("Пользователь уже существует, но аккаунт Google не привязан");
        }
        try {
            let newUser = {
                username: dto.email,
                firstname: dto.firstname,
                lastname: dto.lastname,
                gender: dto.gender,
                email: dto.email,
                googleId: dto.googleId,
                password: process.env.AUTO_PASS,
                role: roles_1.Roles.USER
            };
            await this.userModel.create(newUser);
            return this.signin({ username: newUser.username, password: "", rememberMe: true, authStrategy: "google" });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async signInWithYandex(dto) {
        if (!dto)
            throw new common_1.BadRequestException();
        let user = await this.userModel.findOne({ yandexId: dto.yandexId });
        if (user)
            return this.signin({ username: user.username, password: "", rememberMe: false, authStrategy: "yandex" });
        user = await this.userModel.findOne({ email: dto.email });
        if (user) {
            throw new common_1.ForbiddenException("Пользователь уже существует, но аккаунт Yandex не привязан");
        }
        try {
            let newUser = {
                username: dto.username,
                firstname: dto.firstname,
                lastname: dto.lastname,
                gender: dto.gender,
                email: dto.email,
                yandexId: dto.yandexId,
                password: process.env.AUTO_PASS,
                role: roles_1.Roles.USER
            };
            await this.userModel.create(newUser);
            return this.signin({ username: newUser.username, password: "", rememberMe: true, authStrategy: "yandex" });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async signInWithVkontakte(dto) {
        if (!dto)
            throw new common_1.BadRequestException();
        let user = await this.userModel.findOne({ vkontakteId: dto.vkontakteId });
        if (user)
            return this.signin({ username: user.username, password: "", rememberMe: false, authStrategy: "vkontakte" });
        user = await this.userModel.findOne({ email: dto.email });
        if (user) {
            throw new common_1.ForbiddenException("Пользователь уже существует, но аккаунт VK не привязан");
        }
        try {
            let newUser = {
                username: dto.username,
                firstname: dto.firstname,
                lastname: dto.lastname,
                gender: dto.gender,
                email: dto.email,
                vkontakteId: dto.vkontakteId,
                password: process.env.AUTO_PASS,
                role: roles_1.Roles.USER
            };
            await this.userModel.create(newUser);
            return this.signin({ username: newUser.username, password: "", rememberMe: true, authStrategy: "vkontakte" });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async adminRegister(dto) {
        if (!dto)
            throw new common_1.BadRequestException();
        let admin = await this.userModel.findById(dto.adminId);
        if (admin.role != roles_1.Roles.ADMINISTRATOR) {
            throw new common_1.ForbiddenException("Вы не можете зарегистрировать нового администратора, т.к. сами им не являетесь");
        }
        let user = await this.userModel.findOne({ email: dto.email });
        if (user) {
            user.role = roles_1.Roles.ADMINISTRATOR;
            user.password = await this.passwordHash(dto.password);
            await user.save();
        }
        else {
            let entity = await this.userModel.findOne({ username: dto.username } || { email: dto.email });
            if (entity !== null)
                throw new common_1.BadRequestException('Пользователь с такой почтой или именем пользователя уже существует');
            user.username = dto.username;
            user.firstname = dto.firstname;
            user.lastname = dto.lastname;
            user.gender = dto.gender;
            user.email = dto.email;
            user.role = roles_1.Roles.ADMINISTRATOR;
            user.password = await this.passwordHash(dto.password);
            let createdAdmin = await this.userModel.create(user);
            return { adminId: createdAdmin.id };
        }
    }
    async adminLogin(dto) {
        if (!dto)
            throw new common_1.BadRequestException();
        let user = await this.userModel.findOne({ email: dto.email });
        if (!user) {
            throw new common_1.NotFoundException("Пользователь не найден");
        }
        if (user.username !== dto.username) {
            throw new common_1.BadRequestException("Неверное имя пользователя");
        }
        if (user.role !== roles_1.Roles.ADMINISTRATOR) {
            throw new common_1.ForbiddenException("Вы не являетесь администратором");
        }
        let result = await this.signin({
            username: dto.username,
            password: dto.password,
            rememberMe: false,
            authStrategy: "jwt"
        });
        return result;
    }
    async passwordValidate(password, hash) {
        return await bcrypt.compare(password, hash);
    }
    async passwordHash(password) {
        let salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map