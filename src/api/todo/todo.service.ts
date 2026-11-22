import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateTodoRequest } from './dto/create-todo.dto.js';
import { FindAllTodoResponse } from './dto/find-all-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { TodoEntity } from './entities/todo.entity.js';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async create(dto: CreateTodoRequest) {
    const { title, status } = dto;

    const existUser = await this.todoRepository.findOneBy({ title });

    if (existUser) {
      throw new ConflictException('Такая задача уже существует');
    }

    const todo = await this.todoRepository.save({
      title,
      status,
    });

    return todo;
  }

  async findAll(dto: FindAllTodoResponse) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const [items, total] = await this.todoRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(title: string) {
    const findTodos = await this.todoRepository.findBy({
      title: ILike(`%${title}%`),
    });

    return findTodos;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { affected } = await this.todoRepository.update(id, updateTodoDto);

    if (affected === 0) {
      throw new NotFoundException('Задача не найдена');
    }

    return this.todoRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const result = await this.todoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Задача не найдена');
    }

    return 'Успешно';
  }
}
