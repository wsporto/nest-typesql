import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MYSQL_CONNECTION, TYPESQL } from './provider-tokens';
import * as typesql from "./sqls/index";

export type TypeSql = typeof typesql;

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: MYSQL_CONNECTION,
      useFactory: async () => {
        const connection = await createConnection({
          host: 'localhost',
          database: 'northwind',
          user: 'root',
          password: 'password'
        });
        return connection;
      }
    },
    {
      provide: TYPESQL,
      useFactory: () => typesql
    }
  ],
})
export class AppModule { }
