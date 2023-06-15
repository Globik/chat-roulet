import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "jsonwebtoken";
export declare class JwtManager {
    createJwtService(expires: string): JwtService;
    generateAccessToken(user: any): {
        access_token: string;
        expires: number;
    };
    generateRefreshToken(userId: string, hash: string): {
        refresh_token: string;
        expires: number;
    };
    parseToken(token: string): any;
    decodeToken(token: string): JwtPayload;
    private addMinutes;
    private addDays;
}
