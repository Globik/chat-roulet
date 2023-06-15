import { CanActivate } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
export declare class WsGuard implements CanActivate {
    private userService;
    constructor(userService: UserService);
    canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any>;
}
