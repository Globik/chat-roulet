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
exports.LinkGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
let LinkGoogleStrategy = class LinkGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, "link-google") {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `https://chat-roulet.ru/api/auth/google-link/redirect`,
            scope: ["email", "profile"],
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { id, emails } = profile;
        const user = {
            id: id,
            email: emails[0].value,
            accessToken,
            refreshToken
        };
        done(null, user);
    }
};
LinkGoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LinkGoogleStrategy);
exports.LinkGoogleStrategy = LinkGoogleStrategy;
//# sourceMappingURL=google-link.strategy.js.map