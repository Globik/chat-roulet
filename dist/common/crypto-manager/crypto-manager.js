"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoManager = void 0;
const common_1 = require("@nestjs/common");
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 2048 });
let CryptoManager = class CryptoManager {
    generateKeyPair() {
        const private_key = key.exportKey('private');
        const public_key = key.exportKey('public');
        return {
            private_key,
            public_key
        };
    }
    encryptString(text, publicKey) {
        const key_public = new NodeRSA(publicKey);
        return key_public.encrypt(text, 'base64');
    }
    decryptString(hash, privateKey) {
        const key_private = new NodeRSA(privateKey);
        return key_private.decrypt(hash, 'utf8');
    }
};
CryptoManager = __decorate([
    (0, common_1.Injectable)()
], CryptoManager);
exports.CryptoManager = CryptoManager;
//# sourceMappingURL=crypto-manager.js.map