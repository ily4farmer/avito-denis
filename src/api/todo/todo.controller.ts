import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateTodoRequest, CreateTodoResponse } from './dto/create-todo.dto.js';
import { FindAllTodoRequest, FindAllTodoResponse } from './dto/find-all-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { TodoService } from './todo.service.js';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Добавить задачу', description: 'Добавление новой задачи' })
  @ApiCreatedResponse({ description: 'Задача добавлена', type: CreateTodoResponse })
  @ApiNotFoundResponse({
    description: 'Не удалось добавить задачу',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Ошибка',
      timestamp: new Date().toISOString(),
      path: '/todo/create',
    },
  })
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTodoDto: CreateTodoRequest) {
    return this.todoService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'Получить список задач с пагинацией' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Список задач получен',
    type: FindAllTodoResponse,
  })
  @ApiBadRequestResponse({
    description: 'Некорректные параметры пагинации',
  })
  @Post('all-todos')
  @HttpCode(HttpStatus.OK)
  findAll(@Body() dto: FindAllTodoRequest) {
    return this.todoService.findAll(dto);
  }

  @ApiOperation({ summary: 'Получить задачу по названию' })
  @ApiParam({
    name: 'title',
    type: 'string',
    description: 'Название задачи',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Задача получена',
    type: [CreateTodoResponse],
  })
  @ApiNotFoundResponse({
    description: 'Не удалось найти задачу',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Ошибка',
      timestamp: new Date().toISOString(),
      path: '/todo-2',
    },
  })
  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.todoService.findOne(title);
  }

  @ApiOperation({ summary: 'Обновить задачу по ID' })
  @ApiOkResponse({
    description: 'Задача обновлена',
    type: CreateTodoResponse,
  })
  @ApiNotFoundResponse({ description: 'Задача не найдена' })
  @ApiBadRequestResponse({ description: 'Некорректные данные' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Удалить задачу по ID' })
  @ApiNoContentResponse({ description: 'Задача удалена' })
  @ApiNotFoundResponse({ description: 'Задача не найдена' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
