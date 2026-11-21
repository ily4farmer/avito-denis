import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ENV } from '../constants/env.js';

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.getOrThrow<string>(ENV.JWT_SECRET),
  };
};
