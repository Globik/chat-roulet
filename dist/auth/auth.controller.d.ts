import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { SignInWithVkDto } from './dto/signInWithVk.dto';
import { SignInWithYandexDto } from './dto/signInWithYandex.dto';
import { SignInWithGoogleDto } from './dto/signInWithGoogle.dto';
import { AdminRegisterDto } from './dto/adminRegister.dto';
import { AdminLoginDto } from './dto/adminLogin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<any>;
    signIn(signInDto: SignInDto): Promise<any>;
    updateRefreshToken(refresh_token: string): Promise<any>;
    signInsWithVk(res: Response): Promise<void>;
    signInWithVkRedirect(req: any): Promise<any>;
    adminLogin(dto: AdminLoginDto): Promise<any>;
    adminRegister(dto: AdminRegisterDto): Promise<{
        adminId: any;
    }>;
    signInWithVk(dto: SignInWithVkDto): Promise<any>;
    signInWithYandex(dto: SignInWithYandexDto): Promise<any>;
    signInWithGoogle(dto: SignInWithGoogleDto): Promise<any>;
}
