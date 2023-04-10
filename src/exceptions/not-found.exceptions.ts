import { BaseException } from "./base.exceptions";

export class NotFoundException extends BaseException {
    readonly statusCode = 404;
    constructor() {
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not Found" }];
    }
};