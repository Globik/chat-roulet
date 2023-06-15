export declare class CryptoManager {
    generateKeyPair(): {
        private_key: any;
        public_key: any;
    };
    encryptString(text: string, publicKey: string): any;
    decryptString(hash: string, privateKey: string): any;
}
