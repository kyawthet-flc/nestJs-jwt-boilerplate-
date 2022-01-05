import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import MysqlConfig from './config.mysql';

@Module({
  imports: [MysqlConfig, AuthModule, UsersModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
  //, UsersService, OrdersService
})
export class AppModule {}
