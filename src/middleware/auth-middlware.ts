import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from "../exceptions/unauthorized.exceptions";
import { UserDTO } from "../users/user.dto";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null)
        throw new UnauthorizedException();

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {
        if (err) throw new UnauthorizedException();
        req.user = user as UserDTO;
        next()
    });
};
