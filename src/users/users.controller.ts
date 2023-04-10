import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.constroller";
import { HttpStatusCode } from "../common/enum/status.enum";
import { validateBody } from "../middleware/body-validation";
import { UserDTO } from "./user.dto";
import { UsersService } from "./users.service";

export class UsersController extends BaseController {
    constructor(private readonly userService: UsersService) {
        super();
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        await this.userService.signup(req.body).then(() => {
            res.status(HttpStatusCode.CREATED).send({ message: 'created' })
        }).catch(next);
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        await this.userService.signin(req.body).then(token => {
            res.status(HttpStatusCode.OK).send({ message: 'authorized', token })
        }).catch(next);
    }

    intializeRoutes(): void {
        this.router.post('/users/signup', validateBody(UserDTO), this.signup.bind(this));
        this.router.post('/users/signin', validateBody(UserDTO), this.signin.bind(this));
    }
}