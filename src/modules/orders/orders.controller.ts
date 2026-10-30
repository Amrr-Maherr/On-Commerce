import type { Request, Response } from 'express';
import * as ordersService from './orders.service.js';

export async function getOrders(_req: Request, res: Response) {
  const orders = await ordersService.getOrders();
  res.json(orders);
}

export async function createOrder(req: Request, res: Response) {
  const order = await ordersService.createOrder(req.body);
  res.status(201).json(order);
}

export async function updateOrder(req: Request, res: Response) {
  const order = await ordersService.updateOrder(String(req.params.id), req.body);
  res.json(order);
}

export async function deleteOrder(req: Request, res: Response) {
  const order = await ordersService.deleteOrder(String(req.params.id));
  res.json(order);
}

export async function singleOrder(req: Request, res: Response) {
  const order = await ordersService.singleOrder(String(req.params.id));
  res.json(order);
}
