import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Repository } from 'typeorm';
import { ENV } from '../../constants/env.js';
import { CreateAuthDto } from './dto/create-auth.dto.js';
import { RegisterResponse } from './dto/register.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { UserEntity } from './entities/user.entity.js';

//TODO - доделать

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = configService.getOrThrow<string>(ENV.JWT_SECRET);
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(ENV.JWT_ACCESS_TOKEN_TTL);
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(ENV.JWT_REFRESH_TOKEN_TTL);
  }

  async register(dto: RegisterResponse) {
    const { name, email, password } = dto;

    const existUser = await this.authRepository.findOneBy({ email });

    if (existUser) {
      throw new Error('Пользователь с такой почтой уже существует');
    }

    const user = await this.authRepository.save({
      name,
      email,
      password: await hash(password),
    });

    return user;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
