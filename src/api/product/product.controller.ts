import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductService } from './product.service.js';

@ApiTags('Products-controller')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Добавить товар', description: 'Добавление нового товара' })
  @ApiOkResponse({ description: 'Товары добавлен' })
  @ApiNotFoundResponse({
    description: 'Не удалось добавить товар',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Ошибка',
      timestamp: new Date().toISOString(),
      path: '/product',
    },
  })
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Все товары', description: 'Получить список всех товаров' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Товары найдены' })
  @ApiNotFoundResponse({ description: 'Товары не найдены' })
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Товар', description: 'Получить конкретный товар по id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id товара',
  })
  @ApiOkResponse({ description: 'Товары найдены', type: CreateProductDto })
  @ApiNotFoundResponse({
    description: 'Товар не найден',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Товар не найден',
      timestamp: new Date().toISOString(),
      path: '/product/323',
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
