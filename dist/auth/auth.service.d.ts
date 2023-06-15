import { Model } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignInWithVkDto } from './dto/signInWithVk.dto';
import { SignInWithYandexDto } from './dto/signInWithYandex.dto';
import { SignInWithGoogleDto } from './dto/signInWithGoogle.dto';
import { AdminRegisterDto } from './dto/adminRegister.dto';
import { AdminLoginDto } from './dto/adminLogin.dto';
export declare class AuthService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserDto: CreateUserDto): Promise<string>;
    private isBlocked;
    signin(loginDto: SignInDto): Promise<any>;
    updateRefreshToken(refreshToken: string): Promise<{
        access_token: string;
        expires: number;
        refresh_token: string;
        refresh_token_expires: number;
    }>;
    signInWithGoogle(dto: SignInWithGoogleDto): Promise<any>;
    signInWithYandex(dto: SignInWithYandexDto): Promise<any>;
    signInWithVkontakte(dto: SignInWithVkDto): Promise<any>;
    adminRegister(dto: AdminRegisterDto): Promise<{
        adminId: any;
    }>;
    adminLogin(dto: AdminLoginDto): Promise<any>;
    private passwordValidate;
    private passwordHash;
}
