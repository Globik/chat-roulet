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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_ticket_dto_1 = require("./dto/create-ticket.dto");
const update_ticket_status_dto_1 = require("./dto/update-ticket-status.dto");
const jwt_auth_guard_1 = require("../auth/jwt/jwt-auth.guard");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async getAll(req) {
        const result = await this.ticketService.getAll(req.header('Authorization').replace('Bearer ', '')).catch((err) => {
            throw err;
        });
        return result;
    }
    async getById(ticketId) {
        const result = await this.ticketService.getById(ticketId).catch((err) => {
            throw err;
        });
        return result;
    }
    async getByApplicantId(applicantId) {
        const result = await this.ticketService.getByApplicantId(applicantId).catch((err) => {
            throw err;
        });
        return result;
    }
    async create(dto) {
        const result = await this.ticketService.create(dto).catch((err) => {
            throw err;
        });
        return result;
    }
    async updateStatus(dto) {
        const result = await this.ticketService.updateStatus(dto).catch((err) => {
            throw err;
        });
        return result;
    }
    async uploadFile(file, ticketId, req) {
        let result = await this.ticketService.uploadFile(file, ticketId).catch((err) => {
            throw err;
        });
        result.fileUrl = req.protocol.concat('://', req.headers['host'], result.fileUrl);
        return result;
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getById", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('?applicantId'),
    __param(0, (0, common_1.Query)('applicantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getByApplicantId", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ticket_dto_1.CreateTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_ticket_status_dto_1.UpdateTicketStatus]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('uploadFile/:ticketId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('ticketId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "uploadFile", null);
TicketController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map