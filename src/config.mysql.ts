import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Order } from './orders/entities/order.entity';
import { OrderDetail } from './orders/entities/order.detail.entity';
import { Payment } from './orders/entities/payments.entity';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'os_note',
  entities: [User, Order, OrderDetail, Payment],
  // entities: ['../**/*.entity{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
});
