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
exports.VkStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_vkontakte_1 = require("passport-vkontakte");
let VkStrategy = class VkStrategy extends (0, passport_1.PassportStrategy)(passport_vkontakte_1.Strategy, "vkontakte") {
    constructor() {
        super({
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
            callbackURL: `http://${process.env.HOST}:${process.env.PORT}/api/auth/vk/redirect`,
            scope: ["email"],
            lang: "ru"
        }, async function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {
            const { id, username, emails, gender, name, _json, photos } = profile;
            const user = {
                id: id,
                email: emails[0].value,
                username: username,
                firstName: name.familyName,
                lastName: name.givenName,
                gender: gender || 'empty',
                accessToken,
                refreshToken,
                photo: photos[0].value
            };
            done(null, user);
        });
    }
    async validate(accessToken, refreshToken, params, profile, done) {
        const { id, email } = profile;
        const user = {
            id: id,
            email: email
        };
        done(null, user);
    }
};
VkStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], VkStrategy);
exports.VkStrategy = VkStrategy;
//# sourceMappingURL=vk.strategy.js.map