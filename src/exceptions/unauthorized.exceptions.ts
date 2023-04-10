import { BaseException } from "./base.exceptions";

export class UnauthorizedException extends BaseException {
    readonly statusCode = 401;
    constructor() {
        super('Unauthorized');
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Unauthorized' }]
    }
}