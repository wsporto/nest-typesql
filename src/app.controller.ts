import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/employees")
  getEmployees() {
    return this.appService.getEmployees();
  }

  @Get("employee-photo/:employeeId")
  async getEmployeePhoto(@Param("employeeId") employeeId: number, @Res() res) {
    const stream = await this.appService.getEmployeePhoto(employeeId);
    return stream.pipe(res);
  }
}
