import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

//pass string to @Controller('users') to route like {your-domain.com/users}
// will route to {your-domain.com/} nothing afer /
@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) {} // dependency injection in action

  // if no controller path is set then method path will be added after the domain
  //this will be routed like {your-domain.com/[controllerPathIfAny]/[ApiPathIfAny]}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  @Header('Content-Type','text/html')
  getHello(): {name: String} {
    return {name : "Muneeb"};
  }

  


}
