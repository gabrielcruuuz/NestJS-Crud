import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (param: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (param) {
        return request.user[param];
      }
      return request.user;
    } else {
      throw new NotFoundException(
        'User not exist in request. Use AuthGuard to get user',
      );
    }
  },
);
