import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PRODUCT_COLOR, PRODUCT_SIZE, PRODUCT_TYPE } from '../../constants/product.js';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar', length: 160 })
  desription: string | null;

  @Column({ type: 'enum', enum: PRODUCT_TYPE })
  type: PRODUCT_TYPE;

  @Column({ type: 'enum', enum: PRODUCT_SIZE })
  size: PRODUCT_SIZE;

  @Column({ type: 'enum', enum: PRODUCT_COLOR })
  color: PRODUCT_COLOR;

  @Column({ type: 'integer' })
  priceInKopecks: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'integer' })
  amt: number;
}
