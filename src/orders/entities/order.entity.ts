import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrderStatus, DeliveryType } from './enums';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from './order.detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  customer_phone: string;

  @Column({ type: 'text', nullable: true })
  customer_address: string;

  @Column({ type: 'datetime', nullable: true })
  ordered_at: Date;

  @Column({ type: 'datetime', nullable: true })
  delivered_at: Date;

  @Column({ type: 'datetime', nullable: true })
  complete_at: Date;

  @Column({
    type: 'enum',
    enum: DeliveryType,
    // default: DeliveryType.BY_COURIER,
    nullable: true,
  })
  delivery_type: DeliveryType;

  @Column({ nullable: true })
  delivery_fee: number;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.ORDERED,
  })
  status: OrderStatus;

  @Column({ nullable: true })
  files: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_id: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order_id)
  orderDetail: OrderDetail[];
}
