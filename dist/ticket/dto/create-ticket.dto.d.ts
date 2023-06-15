import { Reason } from "../enums/reason.enum";
import { Status } from "../enums/status.enum";
export declare class CreateTicketDto {
    reason: Reason;
    status: Status;
    violatorId: string;
    applicantId: string;
    description: string;
}
