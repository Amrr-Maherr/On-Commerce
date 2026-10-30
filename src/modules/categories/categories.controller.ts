import type { Request, Response } from 'express';
import * as categoriesService from './categories.service.js';

export async function getCategories(_req: Request, res: Response) {
  const categories = await categoriesService.getCategories();
  res.json({ success: true, data: categories });
}

export async function createCategory(req: Request, res: Response) {
  const category = await categoriesService.createCategory(req.body);
  res.status(201).json({ success: true, data: category });
}

export async function updateCategory(req: Request, res: Response) {
  const category = await categoriesService.updateCategory(String(req.params.id), req.body);
  res.json({ success: true, data: category });
}

export async function deleteCategory(req: Request, res: Response) {
  const category = await categoriesService.deleteCategory(String(req.params.id));
  res.json({ success: true, data: category });
}

export async function singleCategory(req: Request, res: Response) {
  const category = await categoriesService.singleCategory(String(req.params.id));
  res.json({ success: true, data: category });
}
