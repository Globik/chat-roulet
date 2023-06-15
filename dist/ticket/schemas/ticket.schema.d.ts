/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from "mongoose";
import { Reason } from "../enums/reason.enum";
import { Status } from "../enums/status.enum";
export type TicketDocument = Ticket & Document;
export declare class Ticket {
    reason: Reason;
    status: Status;
    violatorId: string;
    applicantId: string;
    judgeId?: string;
    description: string;
    files?: string[];
    roomId?: string;
    date: number;
}
export declare const TicketSchema: import("mongoose").Schema<Ticket, import("mongoose").Model<Ticket, any, any, any, Document<unknown, any, Ticket> & Omit<Ticket & {
    _id: import("mongoose").Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Ticket, Document<unknown, {}, import("mongoose").FlatRecord<Ticket>> & Omit<import("mongoose").FlatRecord<Ticket> & {
    _id: import("mongoose").Types.ObjectId;
}, never>>;
