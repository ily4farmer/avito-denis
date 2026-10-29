import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from '../constants/env.js';

export const getTypeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.getOrThrow<string>(ENV.MYSQL_HOST),
    port: configService.getOrThrow<number>(ENV.MYSQL_PORT),
    username: configService.getOrThrow<string>(ENV.MYSQL_USER),
    password: configService.getOrThrow<string>(ENV.MYSQL_PASSWORD),
    database: configService.getOrThrow<string>(ENV.MYSQL_DATABASE),
    autoLoadEntities: true,
    synchronize: true,
  };
};
