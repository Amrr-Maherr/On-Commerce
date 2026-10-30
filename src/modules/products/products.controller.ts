import type { Request, Response } from 'express';
import * as productsService from './products.service.js';

export async function getProducts(_req: Request, res: Response) {
  const products = await productsService.getProducts();
  res.json(products);
}

export async function createProduct(req: Request, res: Response) {
  const product = await productsService.createProduct(req.body);
  res.status(201).json(product);
}

export async function updateProduct(req: Request, res: Response) {
  const product = await productsService.updateProduct(String(req.params.id), req.body);
  res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const product = await productsService.deleteProduct(String(req.params.id));
  res.json(product);
}

export async function singleProduct(req: Request, res: Response) {
  const product = await productsService.singleProduct(String(req.params.id));
  res.json(product);
}
