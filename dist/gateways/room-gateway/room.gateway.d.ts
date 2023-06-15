import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from 'socket.io';
import { RoomGatewayService } from "./room.gateway.service";
import { FindNewRoomDto } from "./dto/findNewRoom.dto";
import { UserService } from "src/user/user.service";
import { LeaveRoomDto } from "./dto/leaveRoom.dto";
import { Queue } from "./queue";
export declare class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly gatewayService;
    private readonly userService;
    constructor(gatewayService: RoomGatewayService, userService: UserService);
    private server;
    queue: Queue[];
    q: Map<string, any>;
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    joinToQueue(dto: FindNewRoomDto, socket: Socket): Promise<void>;
    findNewRoom(dto: FindNewRoomDto, socket: Socket): Promise<void>;
    onBye(socket: Socket): Promise<void>;
    onLeaveRoom(dto: LeaveRoomDto, socket: Socket): Promise<void>;
    handleOffer(data: {
        offer: any;
        roomId: string;
    }): void;
    handleAnswer(data: {
        answer: any;
        roomId: string;
    }): void;
    handleIceCandidate(data: {
        candidate: any;
        roomId: string;
    }): void;
}
