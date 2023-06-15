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
exports.YandexStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_yandex_1 = require("passport-yandex");
let YandexStrategy = class YandexStrategy extends (0, passport_1.PassportStrategy)(passport_yandex_1.Strategy, "yandex") {
    constructor() {
        super({
            clientID: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
            callbackURL: `https://chat-roulet.ru/api/auth/yandex/redirect`
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { id, emails, gender, name, _json, photos } = profile;
        const user = {
            id: id,
            email: emails[0].value,
            username: _json.login,
            firstName: name.familyName,
            lastName: name.givenName,
            gender: gender || 'empty',
            accessToken,
            refreshToken,
            photo: photos[0].value
        };
        done(null, user);
    }
};
YandexStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], YandexStrategy);
exports.YandexStrategy = YandexStrategy;
//# sourceMappingURL=yandex.strategy.js.map