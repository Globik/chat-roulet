import { Model } from 'mongoose';
import { RoomDocument } from 'src/room/schemas/room.schema';
export declare class MessageService {
    private readonly roomModel;
    constructor(roomModel: Model<RoomDocument>);
    fileNameIncrement(filePath: string, originalName: string): string;
}
