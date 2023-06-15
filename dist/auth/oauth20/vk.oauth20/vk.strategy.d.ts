import { Profile } from "passport-vkontakte";
declare const VkStrategy_base: new (...args: any[]) => any;
export declare class VkStrategy extends VkStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, params: any, profile: Profile, done: any): Promise<void>;
}
export {};
