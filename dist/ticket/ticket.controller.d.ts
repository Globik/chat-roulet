/// <reference types="multer" />
import { TicketService } from './ticket.service';
import { Request } from 'express';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatus } from './dto/update-ticket-status.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getAll(req: Request): Promise<any>;
    getById(ticketId: string): Promise<any>;
    getByApplicantId(applicantId: string): Promise<any>;
    create(dto: CreateTicketDto): Promise<any>;
    updateStatus(dto: UpdateTicketStatus): Promise<any>;
    uploadFile(file: Express.Multer.File, ticketId: string, req: Request): Promise<{
        fileUrl: string;
        fileName: string;
    }>;
}
