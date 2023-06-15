import { VerifyCallback } from "passport-google-oauth20";
declare const LinkGoogleStrategy_base: new (...args: any[]) => any;
export declare class LinkGoogleStrategy extends LinkGoogleStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
