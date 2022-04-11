import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      Logger.error('no authorization', CheckTokenMiddleware.name);
      res.status(HttpStatus.FORBIDDEN).json({ error: 'Token is missing' });
    } else {
      const token: string = authHeader.split(' ')[1];
      Logger.log('From Middleware');
      try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        res.locals.user = decoded;
        next();
      } catch (err) {
        res
          .status(HttpStatus.FORBIDDEN)
          .json({ error: 'Authentication Error' });
        Logger.error(err);
      }
    }
  }
}
