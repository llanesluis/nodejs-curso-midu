import { Request, Response, NextFunction } from 'express';

/*
const ERROR_HANDLERS = {
  CastError: (res: Response) =>
    res.status(400).send({ error: 'El ID proporcionado no es válido.' }),
  JsonWebTokenError: (res: Response) => res.status(401).json({ error: 'Token invalido' }),
  TokenExpiredError: (res: Response) => res.status(401).json({ error: 'Token expirado' }),
  defaultError: (res: Response) => res.status(500).send('Ha ocurrido un error'),
};
*/

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: `Ruta no encontrada ${req.url}` });
}

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({ error: error.message });
}
