import { OnModuleInit } from "@nestjs/common";
import { Request } from "express";
import { Socket } from "socket.io";
import { NewMessageDto } from "./dto/newMessage.dto";
export declare class MessageGateway implements OnModuleInit {
    private readonly server;
    private readonly logger;
    onSendMessage(messageDto: NewMessageDto, socket: Socket, req: Request): Promise<void>;
    onModuleInit(): void;
}
