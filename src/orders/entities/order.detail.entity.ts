import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  color: string;

  @Column()
  quantity: number;

  @Column()
  sub_totla_price: number;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order_id: Order;
}
