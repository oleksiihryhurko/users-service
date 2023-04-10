import dotenv from 'dotenv';
dotenv.config();

export interface ApplicationConfig {
    server: {
        port: number,
        loglevel: string
    },
    authentication: {
        secret: string,
        expires: string
    }
    database: {
        host: string,
        port: number,
        username: string,
        password: string,
        database: string
    },
    queue: {
        host: string,
        port: number,
        username: string,
        password: string,
        getUrl: () => string
    }
}

export const config: ApplicationConfig = {
    server: {
        port: parseInt(process.env.SERVER_PORT!),
        loglevel: process.env.SERVER_LOG_LEVEL!,
    },
    authentication: {
        secret: process.env.AUTH_SECRET!,
        expires: process.env.AUTH_EXPIRES!
    },
    database: {
        host: process.env.POSTGRES_HOST!,
        port: parseInt(process.env.POSTGRES_PORT!),
        username: process.env.POSTGRES_USERNAME!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DATABASE!,
    },
    queue: {
        host: process.env.RABBITMQ_HOST!,
        port: parseInt(process.env.RABBITMQ_PORT!),
        username: process.env.RABBITMQ_USERNAME!,
        password: process.env.RABBITMQ_PASSWORD!,
        getUrl: (): string => {
            const { host, username, password, port } = config.queue;
            return `amqp://${username}:${password}@${host}:${port}`;
        }
    }
};