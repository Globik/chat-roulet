"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_manager_1 = require("../auth/jwt/jwt.manager");
const message_schema_1 = require("../message/schemas/message.schema");
const room_schema_1 = require("./schemas/room.schema");
const room_controller_1 = require("./room.controller");
const room_service_1 = require("./room.service");
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: room_schema_1.Room.name, schema: room_schema_1.RoomSchema },
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema }
            ])
        ],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService, jwt_manager_1.JwtManager]
    })
], RoomModule);
exports.RoomModule = RoomModule;
//# sourceMappingURL=room.module.js.map