"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const message_gateway_module_1 = require("./gateways/message-gateway/message.gateway.module");
const room_module_1 = require("./room/room.module");
const serve_static_1 = require("@nestjs/serve-static");
const message_module_1 = require("./message/message.module");
const jwt_manager_1 = require("./auth/jwt/jwt.manager");
const ticket_module_1 = require("./ticket/ticket.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: '/root/chatclient/dist',
                exclude: ['/api*', '/join']
            }),
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            user_module_1.UserModule,
            message_gateway_module_1.MessageGatewayModule,
            room_module_1.RoomModule,
            message_module_1.MessageModule,
            ticket_module_1.TicketModule
        ],
        controllers: [],
        providers: [jwt_manager_1.JwtManager],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map