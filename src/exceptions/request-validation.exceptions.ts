import { ValidationError } from "class-validator";
import { BaseException } from "./base.exceptions";

export class RequestValidationException extends BaseException {
    readonly statusCode = 400;
    constructor(private errors: ValidationError[]) {
        super("Invalid request parameters");
        Object.setPrototypeOf(this, RequestValidationException.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.errors.map((error) => {
            const message = Object.values(error.constraints!).join('. ');
            return { message, field: error.property };
        });
    }
}