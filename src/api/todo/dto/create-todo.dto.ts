import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TODO_STATUS } from '../../../constants/todo.js';

export class CreateTodoRequest {
  @ApiProperty({
    description: 'Название задачи',
    example: 'Todo 1',
    type: String,
  })
  @IsNotEmpty({ message: 'Название обязательно для заполнения' })
  @IsString({ message: 'Название должно быть строкой' })
  @MinLength(1, { message: 'Название не должно быть меньше 1 символа' })
  @MaxLength(128, { message: 'Название не должно быть больше 128 символов' })
  title: string;

  @ApiProperty({
    description: 'Статус задачи',
    example: TODO_STATUS.ACTIVE,
    type: String,
  })
  @IsNotEmpty({ message: 'Статус обязателен для заполнения' })
  @IsString({ message: 'Статус должен быть строкой' })
  @IsEnum(TODO_STATUS)
  status: TODO_STATUS;
}

export class CreateTodoResponse extends PartialType(CreateTodoRequest) {
  @ApiProperty({
    description: 'Название задачи',
    example: '434',
    type: String,
  })
  @IsNotEmpty({ message: 'Название обязательно для заполнения' })
  @IsString({ message: 'Название должно быть строкой' })
  @MinLength(1, { message: 'Название не должно быть меньше 1 символа' })
  @MaxLength(128, { message: 'Название не должно быть больше 128 символов' })
  id: number;

  @ApiProperty({
    description: 'Дата создания',
    example: '2026-11-21T14:37:13.269Z',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2026-11-21T14:37:13.269Z',
    type: String,
  })
  updatedAt: string;
}
