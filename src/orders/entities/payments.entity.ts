import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentStatus } from './enums';
import { User } from '../../users/entities/user.entity';

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ type: 'datetime' })
  started_at: Date;

  @Column({ type: 'datetime' })
  ended_at: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.ACTIVE,
  })
  status: PaymentStatus;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_id: User;
}
