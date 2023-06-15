import { Model } from "mongoose";
import { RoomDocument } from "src/room/schemas/room.schema";
import { NewMessageDto } from "./dto/newMessage.dto";
import { MessageDocument } from "../../message/schemas/message.schema";
import { CryptoManager } from "src/common/crypto-manager/crypto-manager";
export declare class MessageGateWayService {
    private readonly messageModel;
    private readonly roomModel;
    private readonly cryptoManager;
    constructor(messageModel: Model<MessageDocument>, roomModel: Model<RoomDocument>, cryptoManager: CryptoManager);
    newMessage(dto: NewMessageDto): Promise<any>;
}
