import { DataSource } from 'typeorm';
import { Owner } from '../owners/owner.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Owner, Vehicle],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // ⚠️ Solo usar synchronize en dev
});
