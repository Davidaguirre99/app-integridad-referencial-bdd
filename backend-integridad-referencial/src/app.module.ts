import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabasesController } from './controllers/databases/databases.controller';
import { databaseProviders } from './database.provider';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './services/database/database.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, DatabasesController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
