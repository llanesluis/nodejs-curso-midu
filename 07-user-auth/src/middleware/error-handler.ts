import { Request, Response, NextFunction } from 'express';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  res.status(404).send(`Ruta no encontrada ${req.url}`);
}

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(error);
  res.status(500).send('Ha ocurrido un error...');
}
