import { Reason } from "src/ticket/enums/reason.enum";
export declare class BlockUserDto {
    userId: string;
    judgeId: string;
    lockdownEnd: number;
    reason: Reason;
}
