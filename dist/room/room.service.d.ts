import { Model } from 'mongoose';
import { RoomDocument } from 'src/room/schemas/room.schema';
import { MessageDocument } from 'src/message/schemas/message.schema';
import { UserRoomsViewModel } from './viewModels/userRooms.viewModel';
export declare class RoomService {
    private readonly roomModel;
    private readonly messageModel;
    constructor(roomModel: Model<RoomDocument>, messageModel: Model<MessageDocument>);
    getRoomDetails(roomId: string): Promise<{
        id: any;
        startTime: number;
        endTime: number;
        members: string[];
    }>;
    getRoomMessages(roomId: string): Promise<any[]>;
    getUserRooms(userId: string): Promise<UserRoomsViewModel[]>;
}
