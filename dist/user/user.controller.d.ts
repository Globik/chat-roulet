import { Request } from 'express';
import { UpdateUsernameDto } from './dto/updateUsername.dto';
import { UserService } from './user.service';
import { BlockUserDto } from './dto/block-user.dto';
import { UnblockUserDto } from './dto/unblock-user.dto';
import { RoomGateway } from 'src/gateways/room-gateway/room.gateway';
export declare class UserController {
    private readonly userService;
    private readonly roomGateway;
    constructor(userService: UserService, roomGateway: RoomGateway);
    getDetails(userId: string, req: Request): Promise<{
        id: any;
        username: string;
        fullname: string;
        role: import("../common/permissions-manager/roles").Roles;
        email: string;
        gender: string;
        country: number;
        blocked: boolean;
    }>;
    getUsers(): Promise<any[]>;
    getBlocked(): Promise<any[]>;
    getOnline(): Promise<{
        busy: number;
        online: number;
    }>;
    updateUsername(updateUsernameDto: UpdateUsernameDto): Promise<void>;
    block(dto: BlockUserDto): Promise<void>;
    unblock(dto: UnblockUserDto): Promise<void>;
}
