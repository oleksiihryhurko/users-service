import express, { Response, Router } from 'express';
import { HttpStatusCode } from './enum/status.enum';

export abstract class BaseController {
    protected readonly _router: Router;

    constructor() {
        this._router = express.Router()
        this.intializeRoutes();
    }

    get router(): Router {
        return this._router;
    }

    protected abstract intializeRoutes(): void;
}