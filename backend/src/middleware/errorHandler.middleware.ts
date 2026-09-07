import { Request, Response, NextFunction } from 'express';
import { IS_PRODUCTION } from '../config/env';

// Express recognizes this as an error handler by its 4-argument signature.
export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error('Unhandled error:', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(IS_PRODUCTION ? {} : { stack: err.stack })
  });
}
