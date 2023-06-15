/// <reference types="multer" />
import { Model } from 'mongoose';
import { TicketDocument } from './schemas/ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UserService } from 'src/user/user.service';
import { UpdateTicketStatus } from './dto/update-ticket-status.dto';
export declare class TicketService {
    private readonly ticketModel;
    private readonly userService;
    constructor(ticketModel: Model<TicketDocument>, userService: UserService);
    getAll(token: string): Promise<any>;
    getById(ticketId: string): Promise<any>;
    getByApplicantId(applicantId: any): Promise<any>;
    create(dto: CreateTicketDto): Promise<any>;
    updateStatus(dto: UpdateTicketStatus): Promise<void>;
    uploadFile(file: Express.Multer.File, ticketId: string): Promise<{
        fileUrl: string;
        fileName: string;
    }>;
}
