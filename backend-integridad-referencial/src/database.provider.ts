import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'Davo.6899',
        database: 'AngularChat',
        entities: [],
        synchronize: true,
        options: { encrypt: false },
      });
      return dataSource.initialize();
    },
  },
];
