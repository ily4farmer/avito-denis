import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from '../constants/env.js';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.getOrThrow<string>(ENV.DATABASE_HOST),
    port: configService.getOrThrow<number>(ENV.DATABASE_PORT),
    username: configService.getOrThrow<string>(ENV.DATABASE_USER),
    password: configService.getOrThrow<string>(ENV.DATABASE_PASSWORD),
    database: configService.getOrThrow<string>(ENV.DATABASE_NAME),
    autoLoadEntities: true,
    synchronize: true,
  };
};
