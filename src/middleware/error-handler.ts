import { NextFunction, Request, Response } from "express";
import { BaseException } from "../exceptions/base.exceptions";
import { logger } from "../utils/logger";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BaseException) {
        logger.error(err.serializeErrors());
        return res.status(err.statusCode).send(err.serializeErrors());
    };
    res.status(400).send({ message: err.message });
} 