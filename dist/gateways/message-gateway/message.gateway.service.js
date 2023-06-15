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
exports.MessageGateWayService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_schema_1 = require("../../room/schemas/room.schema");
const message_schema_1 = require("../../message/schemas/message.schema");
const crypto_manager_1 = require("../../common/crypto-manager/crypto-manager");
let MessageGateWayService = class MessageGateWayService {
    constructor(messageModel, roomModel, cryptoManager) {
        this.messageModel = messageModel;
        this.roomModel = roomModel;
        this.cryptoManager = cryptoManager;
    }
    async newMessage(dto) {
        let room = await this.roomModel.findById(dto.roomId);
        if (room === null)
            throw new common_1.NotFoundException('Комнаты не существует');
        let result = await this.messageModel.create({
            userId: dto.userId,
            text: dto.text,
            roomId: dto.roomId,
            date: Date.now()
        });
        if (typeof result === "string") {
            return result;
        }
        else {
            return result.id;
        }
    }
};
MessageGateWayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        crypto_manager_1.CryptoManager])
], MessageGateWayService);
exports.MessageGateWayService = MessageGateWayService;
//# sourceMappingURL=message.gateway.service.js.map