import { NextFunction, Request, Response } from "express"
import { plainToInstance, ClassConstructor } from 'class-transformer'
import { validate } from "class-validator"
import { RequestValidationException } from "../exceptions/request-validation.exceptions"

function validateBody<T>(type: ClassConstructor<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const body = plainToInstance(type, req.body)
        const errors = await validate(body as object);
        if (errors.length) {
            next(new RequestValidationException(errors));
        }
        next();
    }
}

export { validateBody }