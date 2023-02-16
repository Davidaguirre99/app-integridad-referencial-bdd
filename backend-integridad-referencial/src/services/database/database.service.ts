import { Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
@Injectable()
export class DatabaseService {
  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}
  async getDb(): Promise<any[]> {
    const rawData = await this.dataSource.query(
      'use Orders select  * from sys.databases',
    );
    const databases = [];

    rawData.map((database) => {
      const databaseObject = {
        nombre: database.name,
        id_db: database.database_id,
      };
      databases.push(databaseObject);
    });
    return new Promise((resolve) => {
      resolve(databases);
    });
  }
  async getFKConstraints(dbName: string): Promise<any> {
    await this.dataSource.query('use ' + dbName + ';');
    const resultData = await this.dataSource.query(
      'select OBJECT_NAME(parent_object_id) as Parent,OBJECT_NAME(referenced_object_id)  as Child from sys.foreign_keys',
    );
    return new Promise((resolve) => {
      resolve(resultData);
    });
  }
  async getDbccConstraints(dbName: string): Promise<any> {
    await this.dataSource.query('use ' + dbName + ' ;');
    const referencedTables = await this.dataSource.query(
      'select OBJECT_NAME(parent_object_id)  as Child from sys.foreign_keys',
    );
    console.log('Warnigng before referenced tables;');
    return this.groupCheckConstraints(referencedTables, dbName).then(
      (object) => {
        console.log('object', object);
        return object;
      },
    );
  }
  async getTriggersOfADatabase(dbName: string): Promise<any> {
    await this.dataSource.query('use ' + dbName + ' ;');
    const triggers = await this.dataSource.query(
      'select object_id as id_trigger,name,OBJECT_NAME(parent_id) as parent_object from sys.triggers',
    );
    return triggers;
  }
  async groupCheckConstraints(
    referencedTables: any[],
    dbName: string,
  ): Promise<any> {
    const resultChkConstraint: any[] = [];
    referencedTables.map((table) => {
      this.dbbCheckConstraintTable(table, dbName).then((element) => {
        if (element) {
          console.log('elemento=', element);
          resultChkConstraint.push({ Table: table.Child, Anomalias: element });
        }
      });
    });
    await this.sleep(2000);
    return new Promise((resolve) => {
      resolve(resultChkConstraint);
    });
  }
  async dbbCheckConstraintTable(
    referencedTable: any,
    dbName: string,
  ): Promise<any> {
    return this.dataSource.query(
      'use ' +
        dbName +
        ' ' +
        'dbcc checkconstraints( ' +
        referencedTable.Child +
        ') ',
    );
  }
}
