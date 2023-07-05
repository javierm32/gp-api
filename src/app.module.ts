import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { enviroments } from './enviroments';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { ProspectsModule } from './prospects/prospects.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProspectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
