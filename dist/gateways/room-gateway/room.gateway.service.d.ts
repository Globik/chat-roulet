import { Model } from "mongoose";
import { RoomDocument } from "src/room/schemas/room.schema";
import { LeaveRoomDto } from "./dto/leaveRoom.dto";
export declare class RoomGatewayService {
    private readonly roomModel;
    constructor(roomModel: Model<RoomDocument>);
    create(usersId: string[]): Promise<any>;
    leave(dto: LeaveRoomDto): Promise<void>;
}
