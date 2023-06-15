import { Model } from 'mongoose';
import { UpdateUsernameDto } from './dto/updateUsername.dto';
import { UserDocument } from './schemas/user.schema';
import { Roles } from 'src/common/permissions-manager/roles';
import { BlockUserDto } from './dto/block-user.dto';
import { UnblockUserDto } from './dto/unblock-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUserById(userId: string): Promise<UserDocument>;
    getAll(queue: any[]): Promise<any[]>;
    getBlocked(): Promise<any[]>;
    getOnline(queue: any[]): Promise<{
        busy: number;
        online: number;
    }>;
    getDetails(userId: string, host?: string): Promise<{
        id: any;
        username: string;
        fullname: string;
        role: Roles;
        email: string;
        gender: string;
        country: number;
        blocked: boolean;
    }>;
    updateUsername(updateUsernameDto: UpdateUsernameDto): Promise<void>;
    block(dto: BlockUserDto): Promise<any>;
    unBlock(dto: UnblockUserDto): Promise<any>;
}
