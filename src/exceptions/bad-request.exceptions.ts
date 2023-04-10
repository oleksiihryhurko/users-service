import { BaseException } from "./base.exceptions";

export class BadRequestException extends BaseException {
    readonly statusCode = 400;
    constructor(private reason: string) {
        super(reason);
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.reason }];
    }
}