"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const room_gateway_1 = require("./room.gateway");
const room_gateway_service_1 = require("./room.gateway.service");
const user_schema_1 = require("../../user/schemas/user.schema");
const room_schema_1 = require("../../room/schemas/room.schema");
const user_service_1 = require("../../user/user.service");
let RoomGatewayModule = class RoomGatewayModule {
};
RoomGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: room_schema_1.Room.name, schema: room_schema_1.RoomSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [room_gateway_service_1.RoomGatewayService, room_gateway_1.RoomGateway, user_service_1.UserService],
    })
], RoomGatewayModule);
exports.RoomGatewayModule = RoomGatewayModule;
//# sourceMappingURL=room.gateway.module.js.map