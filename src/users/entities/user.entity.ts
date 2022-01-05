// import { Order } from 'src/orders/entities/order.entity';
import {
  BeforeUpdate,
  BaseEntity,
  BeforeInsert,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Payment } from '../../orders/entities/payments.entity';
import * as bcrypt from 'bcryptjs';

export enum UserStatus {
  ACTIVE = '1',
  INACTIVE = '2',
  DELETED = '3',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column({ nullable: true })
  device_token: string;

  @Column({ nullable: true })
  os: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ type: 'datetime', nullable: true })
  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  @UpdateDateColumn()
  updated_at: Date;
  
  @Column({ nullable: true})
  refresh_token: string;

  @Column({ nullable: true})
  refresh_token_expires:string;

  @OneToMany(() => Order, (order) => order.user_id)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user_id)
  payments: Payment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
