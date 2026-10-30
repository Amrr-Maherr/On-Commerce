import { Product } from './product.schema.js';

export async function getProducts() {
  return Product.find()
    .limit(24)
    .select('title price sold ratingsAverage ratingsQuantity imageCover category brand')
    .populate('brand', 'name slug image')
    .populate('category', 'name slug image');
}

export async function createProduct(data: any) {
  return Product.create(data);
}

export async function updateProduct(id: string, data: any) {
  return Product.findByIdAndUpdate(id, data, { new: true })
    .populate('brand', 'name slug image')
    .populate('category', 'name slug image');
}

export async function deleteProduct(id: string) {
  return Product.findByIdAndDelete(id);
}

export async function singleProduct(id: string) {
  return Product.findById(id)
    .populate('brand', 'name slug image')
    .populate('category', 'name slug image');
}
