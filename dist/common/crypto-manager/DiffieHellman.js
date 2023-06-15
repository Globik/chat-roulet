"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffieHellman = void 0;
const crypto = require('crypto');
class DiffieHellman extends crypto.DiffieHellman {
    constructor(prime = 'c23b53d262fa2a2cf2f730bd38173ec3', generator = '05') {
        super(prime, 'hex', generator, 'hex');
    }
    getKey() {
        return this.generateKeys('base64');
    }
    getSecret(otherPubKey) {
        return this.computeSecret(otherPubKey, 'base64', 'hex');
    }
    static createPrime(encoding = null, primeLength = 128, generator = 2) {
        const dh = new crypto.DiffieHellman(primeLength, generator);
        return dh.getPrime(encoding);
    }
}
exports.DiffieHellman = DiffieHellman;
//# sourceMappingURL=DiffieHellman.js.map