import type { Request, Response } from 'express';

export function getHello(_req: Request, res: Response) {
  res.send('Hello World!');
}
