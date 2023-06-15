import { Profile, Strategy } from "passport-yandex";
declare const YandexStrategy_base: new (...args: any[]) => Strategy<unknown>;
export declare class YandexStrategy extends YandexStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile, done: any): Promise<void>;
}
export {};
