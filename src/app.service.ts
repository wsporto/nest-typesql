import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { Readable } from 'stream';
import { TypeSql } from './app.module';
import { MYSQL_CONNECTION, TYPESQL } from './provider-tokens';
import { SelectEmployeesResult } from './sqls';

@Injectable()
export class AppService {

  constructor(@Inject(MYSQL_CONNECTION) private conn: Connection,
    @Inject(TYPESQL) private typeSql: TypeSql) { }

  getHello(): string {
    return 'Hello World!';
  }

  getEmployees(): Promise<SelectEmployeesResult[]> {
    return this.typeSql.selectEmployees(this.conn);
  }

  async getEmployeePhoto(employeeId: number) {
    const employee = await this.typeSql.selectEmployeePhoto(this.conn,
      {
        employeeId
      }
    );
    const stream = Readable.from(employee.Photo);
    return stream;
  }
}
