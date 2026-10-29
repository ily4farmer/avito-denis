import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ORDER_STATUS } from '../../constants/order.js';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
  status: ORDER_STATUS;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
