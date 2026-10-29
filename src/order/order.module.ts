import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity.js';
import { OrderController } from './order.controller.js';
import { OrderService } from './order.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
