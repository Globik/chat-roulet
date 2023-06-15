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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_schema_1 = require("./schemas/room.schema");
const message_schema_1 = require("../message/schemas/message.schema");
let RoomService = class RoomService {
    constructor(roomModel, messageModel) {
        this.roomModel = roomModel;
        this.messageModel = messageModel;
    }
    async getRoomDetails(roomId) {
        let room = await this.roomModel.findById(roomId);
        if (room === null)
            throw new common_1.NotFoundException('Комнаты не существует');
        let message = await this.messageModel.findOne({ roomId: roomId }).sort({ _id: -1 });
        let lastMessage = null;
        if (message) {
            lastMessage = {
                text: message.text,
                userId: message.userId,
                date: message.date
            };
        }
        return {
            id: room.id,
            startTime: room.startTime,
            endTime: room.endTime,
            members: room.userId
        };
    }
    async getRoomMessages(roomId) {
        let room = await this.roomModel.findById(roomId);
        if (room === null)
            throw new common_1.NotFoundException('Комнаты не существует');
        let messages = await this.messageModel.find({ roomId: roomId });
        let result = [];
        messages.forEach(message => {
            result.push({
                id: message.id,
                text: message.text,
                date: message.date,
                userId: message.userId
            });
        });
        return result;
    }
    async getUserRooms(userId) {
        let rooms = await this.roomModel.find({ userId: userId });
        let result = [];
        rooms.forEach(room => {
            result.push({
                id: room.id,
                startTime: room.startTime,
                endTime: room.endTime
            });
        });
        return result;
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map