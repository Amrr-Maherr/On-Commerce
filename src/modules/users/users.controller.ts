import type { Request, Response } from 'express';
import * as usersService from './users.service.js';

export async function getUsers(_req: Request, res: Response) {
  const users = await usersService.getUsers();
  res.json({ success: true, data: users });
}

export async function createUser(req: Request, res: Response) {
  const user = await usersService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
}

export async function updateUser(req: Request, res: Response) {
  const user = await usersService.updateUser(String(req.params.id), req.body);
  res.json({ success: true, data: user });
}

export async function deleteUser(req: Request, res: Response) {
  const user = await usersService.deleteUser(String(req.params.id));
  res.json({ success: true, data: user });
}

export async function singleUser(req: Request, res: Response) {
  const user = await usersService.singleUser(String(req.params.id));
  res.json({ success: true, data: user });
}
