import type { Request, Response } from 'express';
import * as brandsService from './brands.service.js';

export async function getBrands(_req: Request, res: Response) {
  const brands = await brandsService.getBrands();
  res.json(brands);
}

export async function createBrand(req: Request, res: Response) {
  const brand = await brandsService.createBrand(req.body);
  res.status(201).json(brand);
}

export async function updateBrand(req: Request, res: Response) {
  const brand = await brandsService.updateBrand(String(req.params.id), req.body);
  res.json(brand);
}

export async function deleteBrand(req: Request, res: Response) {
  const brand = await brandsService.deleteBrand(String(req.params.id));
  res.json(brand);
}

export async function singleBrand(req: Request, res: Response) {
  const brand = await brandsService.singleBrand(String(req.params.id));
  res.json(brand);
}
