import { Brand } from './brand.schema.js';

export async function getBrands() {
  return Brand.find().select('name slug image');
}

export async function createBrand(data: any) {
  return Brand.create(data);
}

export async function updateBrand(id: string, data: any) {
  return Brand.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteBrand(id: string) {
  return Brand.findByIdAndDelete(id);
}

export async function singleBrand(id: string) {
  return Brand.findById(id);
}
