declare const crypto: any;
export declare class DiffieHellman extends crypto.DiffieHellman {
    constructor(prime?: string, generator?: string);
    getKey(): any;
    getSecret(otherPubKey: any): any;
    static createPrime(encoding?: any, primeLength?: number, generator?: number): any;
}
export {};
