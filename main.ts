import { config } from './src/config/app.config';
import { Application } from "./src/app";
import { UsersController } from "./src/users/users.controller";
import { UsersService } from "./src/users/users.service";
import { postgresDataSource } from './src/database/postgres';
import { logger } from './src/utils/logger';

const usersService = new UsersService();
const usersController = new UsersController(usersService);

const { app } = new Application([
    usersController
], config);

app.listen(config.server.port, async () => {
    logger.info('Server is listening on port: ' + config.server.port)
    await postgresDataSource.initialize();
});