import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { DatabaseService } from './services/database/database.service';

@Controller()
export class AppController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  getAllDatabases(): Promise<any> {
    return this.databaseService.getDb();
  }
  @Get('/fk/:database_name')
  getFKConstraints(@Param('database_name') dbName: string): Promise<any> {
    return this.databaseService.getFKConstraints(dbName);
  }
  @Get('/dbcc/:database_name')
  getDbccConstraints(@Param('database_name') dbName: string): Promise<any> {
    return this.databaseService.getDbccConstraints(dbName);
  }
  @Get('triggers/:database_name')
  getTriggersDatabase(@Param('database_name') dbName: string): Promise<any> {
    return this.databaseService.getTriggersOfADatabase(dbName);
  }
}
