import { ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiNotFoundError(message: string) {
  return ApiNotFoundResponse({
    description: message,
    schema: {
      type: 'object',
      required: ['statusCode', 'message', 'error'],
      properties: {
        statusCode: { type: 'integer', example: 404 },
        message: { type: 'string', example: message },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  });
}
