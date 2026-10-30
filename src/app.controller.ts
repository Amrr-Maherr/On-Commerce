import type { Request, Response } from 'express';

export function getHello(_req: Request, res: Response) {
  res.json({ success: true, data: 'Hello World!' });
}
