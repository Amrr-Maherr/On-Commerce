import type { Request, Response } from 'express';
import * as cartsService from './carts.service.js';

export async function getCarts(_req: Request, res: Response) {
  const carts = await cartsService.getCarts();
  res.json(carts);
}

export async function createCart(req: Request, res: Response) {
  const cart = await cartsService.createCart(req.body);
  res.status(201).json(cart);
}

export async function updateCart(req: Request, res: Response) {
  const cart = await cartsService.updateCart(String(req.params.id), req.body);
  res.json(cart);
}

export async function deleteCart(req: Request, res: Response) {
  const cart = await cartsService.deleteCart(String(req.params.id));
  res.json(cart);
}

export async function singleCart(req: Request, res: Response) {
  const cart = await cartsService.singleCart(String(req.params.id));
  res.json(cart);
}
