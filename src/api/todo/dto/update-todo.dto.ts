import { PartialType } from '@nestjs/swagger';
import { CreateTodoRequest } from './create-todo.dto.js';

export class UpdateTodoDto extends PartialType(CreateTodoRequest) {}
