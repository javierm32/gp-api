import { DataSource, DataSourceOptions } from 'typeorm';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '.env' });
// console.log(process.env.DATABASE_URL);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgres://root:123456@localhost:5432/gp_db',
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
