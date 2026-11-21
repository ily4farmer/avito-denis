import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserAgent = createParamDecorator((__data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as Request;

  return request.headers['user-agent'];
});
