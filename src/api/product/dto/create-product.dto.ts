import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PRODUCT_COLOR, PRODUCT_SIZE, PRODUCT_TYPE } from '../../../constants/product.js';

export class CreateProductDto {
  @ApiProperty({ description: 'Название товара', example: 'Хлопковая футболка', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Футболка свободного кроя, 100% хлопок', type: String })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Тип товара',
    example: PRODUCT_TYPE.HOODIE,
    type: String,
    enum: PRODUCT_TYPE,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PRODUCT_TYPE)
  type: PRODUCT_TYPE;

  @ApiProperty({
    description: 'Размер товара',
    enum: PRODUCT_SIZE,
    example: PRODUCT_SIZE.M,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PRODUCT_SIZE)
  size: PRODUCT_SIZE;

  @ApiProperty({
    description: 'Цвет товара',
    enum: PRODUCT_COLOR,
    example: PRODUCT_COLOR.BLACK,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(PRODUCT_COLOR)
  color: PRODUCT_COLOR;

  @ApiPropertyOptional({ description: 'Цена товара', example: 299_90, type: Number })
  @IsNumber()
  @IsOptional()
  priceInKopecks?: number;
}
