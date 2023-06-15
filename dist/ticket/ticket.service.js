"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ticket_schema_1 = require("./schemas/ticket.schema");
const user_service_1 = require("../user/user.service");
const status_enum_1 = require("./enums/status.enum");
const roles_1 = require("../common/permissions-manager/roles");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const jwt_manager_1 = require("../auth/jwt/jwt.manager");
let TicketService = class TicketService {
    constructor(ticketModel, userService) {
        this.ticketModel = ticketModel;
        this.userService = userService;
    }
    async getAll(token) {
        let payload = await new jwt_manager_1.JwtManager().parseToken(token);
        if (payload.role !== roles_1.Roles.ADMINISTRATOR)
            throw new common_1.ForbiddenException("Вы не являетесь администратором");
        let tickets = await this.ticketModel.find();
        let result = [];
        tickets.forEach(ticket => {
            result.push({
                id: ticket.id,
                reason: ticket.reason,
                applicant: ticket.applicantId,
                status: ticket.status,
                date: ticket.date
            });
        });
        return result;
    }
    async getById(ticketId) {
        let ticket = await this.ticketModel.findById(ticketId);
        if (!ticket)
            throw new common_1.NotFoundException("Жалоба не найдена");
        return {
            id: ticket.id,
            reason: ticket.reason,
            status: ticket.status,
            applicantId: ticket.applicantId,
            violatorId: ticket.violatorId,
            date: ticket.date,
            description: ticket.description
        };
    }
    async getByApplicantId(applicantId) {
        let tickets = await this.ticketModel.find({ applicantId: applicantId });
        let result = [];
        tickets.forEach(ticket => {
            result.push({
                id: ticket.id,
                reason: ticket.reason,
                applicant: ticket.applicantId,
                status: ticket.status,
                date: ticket.date
            });
        });
        return tickets;
    }
    async create(dto) {
        await this.userService.getUserById(dto.violatorId);
        await this.userService.getUserById(dto.applicantId);
        const result = await this.ticketModel.create({
            reason: dto.reason,
            status: dto.status,
            applicantId: dto.applicantId,
            violatorId: dto.violatorId,
            date: Date.now(),
            description: dto.description
        });
        return {
            ticketId: result.id
        };
    }
    async updateStatus(dto) {
        const judge = await this.userService.getUserById(dto.judgeId);
        if (judge.role !== roles_1.Roles.ADMINISTRATOR && dto.status !== status_enum_1.Status.CLOSED)
            throw new common_1.ForbiddenException("Вы не являетесь администратором");
        let ticket = await this.ticketModel.findById(dto.ticketId);
        if (!ticket)
            throw new common_1.NotFoundException("Жалоба не найдена");
        ticket.status = dto.status;
        ticket.judgeId = dto.judgeId;
        await ticket.save();
    }
    async uploadFile(file, ticketId) {
        let ticket = await this.ticketModel.findById(ticketId);
        if (!ticket)
            throw new common_1.NotFoundException('Жалоба не найдена');
        const _fileRootPath = `./storage/ticket/attachments/${ticketId}/`;
        if (!(0, fs_1.existsSync)(_fileRootPath)) {
            await (0, fs_1.mkdir)(_fileRootPath, { recursive: true }, (err) => { console.log(err); });
        }
        let _fileName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
        (0, fs_1.writeFile)((0, path_1.join)(_fileRootPath, _fileName), file.buffer, (err) => {
            if (err) {
                return console.log(err);
            }
        });
        ticket.files.push(_fileName);
        await ticket.save();
        return {
            fileUrl: `/ticket/attachments/${ticketId}/`.concat(_fileName),
            fileName: _fileName
        };
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map