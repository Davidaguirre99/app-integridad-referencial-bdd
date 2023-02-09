import { Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
@Injectable()
export class DatabaseService {
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
    const resultChckConstr = [];
    const referencedTables = await this.dataSource
      .query(
        'select distinct OBJECT_NAME(referenced_object_id)  as Child from sys.foreign_keys',
      )
      .then(async (childTable) => {
        childTable.map(async (object) => {
          const result = await this.dataSource.query(
            'use ' +
              dbName +
              ' ' +
              'dbcc checkconstraints( ' +
              object.Child +
              ') ',
          );

          if (result) {
            console.log('result data =', result);
            resultChckConstr.push(object);
          }
        });
      });

    // for (let i = 0; i < referencedTables.lenght; i++) {
    //   console.log('referenced tables[i] = ', referencedTables[i]);
    //   const childTable = await this.dataSource.query(
    //     'use ' +
    //       dbName +
    //       ' ' +
    //       'dbcc checkconstraints( ' +
    //       referencedTables[i].Child +
    //       ') ',
    //   );
    //   console.log('result data =', childTable);
    //   resultChckConstr.push(childTable);
    // }
    console.log('result check = ', resultChckConstr);
    return new Promise((resolve) => {
      resolve(resultChckConstr);
    });
  }
}
