import winston, { format, transports } from 'winston';
import { config } from '../config/app.config'

const { combine, timestamp, prettyPrint } = format;
export const logger = winston.createLogger({
    level: config.server.loglevel,
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        prettyPrint()
    ),
    transports: [new transports.Console()],
    defaultMeta: { service: 'users-service' },
});