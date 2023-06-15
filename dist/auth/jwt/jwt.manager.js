"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtManager = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtManager = class JwtManager {
    createJwtService(expires) {
        return new jwt_1.JwtService({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: expires },
        });
    }
    generateAccessToken(user) {
        let jwtService = this.createJwtService('30m');
        const payload = {
            email: user.email,
            username: user.username,
            userid: user.id,
            role: user.role,
        };
        return {
            access_token: jwtService.sign(payload),
            expires: this.addMinutes(30).getTime()
        };
    }
    generateRefreshToken(userId, hash) {
        let jwtService = this.createJwtService('7d');
        const payload = {
            userId,
            hash,
            type: 'refresh_token'
        };
        return {
            refresh_token: jwtService.sign(payload),
            expires: this.addDays(7).getTime()
        };
    }
    parseToken(token) {
        let jwtService = this.createJwtService('30m');
        const user = jwtService.verify(token);
        return user;
    }
    decodeToken(token) {
        const base64Payload = token.split('.')[1];
        const payloadBuffer = Buffer.from(base64Payload, 'base64');
        const updatedJwtPayload = JSON.parse(payloadBuffer.toString());
        return updatedJwtPayload;
    }
    addMinutes(minutes) {
        var futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + minutes);
        return futureDate;
    }
    addDays(days) {
        var futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return futureDate;
    }
};
JwtManager = __decorate([
    (0, common_1.Injectable)()
], JwtManager);
exports.JwtManager = JwtManager;
//# sourceMappingURL=jwt.manager.js.map