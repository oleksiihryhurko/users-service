import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { BaseController } from './common/base.constroller';
import { ApplicationConfig } from './config/app.config';
import { NotFoundException } from './exceptions/not-found.exceptions';
import { errorHandler } from './middleware/error-handler';
import { loggerMiddleware } from './middleware/logger-middlware';

export class Application {
    private readonly _app: Express;

    constructor(controllers: BaseController[], private readonly config: ApplicationConfig) {
        this._app = express();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this._app.use(errorHandler);
    }

    get app(): Express {
        return this._app;
    }

    private initializeMiddlewares(): void {
        this._app.use(loggerMiddleware);
        this._app.use(bodyParser.json());
    }

    private initializeControllers(controllers: BaseController[]): void {
        controllers.forEach((controller) => {
            this._app.use('/api', controller.router);
        });
        this._app.all('*', () => {
            throw new NotFoundException();
        })
    }
}