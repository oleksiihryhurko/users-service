import { DataSource } from 'typeorm';
import { config } from '../config/app.config';

const postgresDataSource = new DataSource({
    type: 'postgres',
    entities: ["src/**/*.entity.ts"],
    synchronize: true,
    ...config.database
});

export { postgresDataSource };