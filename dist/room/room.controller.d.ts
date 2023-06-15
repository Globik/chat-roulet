import { Request } from 'express';
import { JwtManager } from 'src/auth/jwt/jwt.manager';
import { RoomService } from './room.service';
export declare class RoomController {
    private readonly roomService;
    private readonly jwtManager;
    constructor(roomService: RoomService, jwtManager: JwtManager);
    getRoomDetails(roomId: string, req: Request): Promise<{
        id: any;
        startTime: number;
        endTime: number;
        members: string[];
    }>;
    getRoomMessages(roomId: string, req: Request): Promise<any[]>;
    getUserRooms(userId: string, req: Request): Promise<import("./viewModels/userRooms.viewModel").UserRoomsViewModel[]>;
}
