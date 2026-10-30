import { Category } from './category.schema.js';

export async function getCategories() {
  return Category.find().select('name slug image');
}

export async function createCategory(data: any) {
  return Category.create(data);
}

export async function updateCategory(id: string, data: any) {
  return Category.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteCategory(id: string) {
  return Category.findByIdAndDelete(id);
}

export async function singleCategory(id: string) {
  return Category.findById(id);
}
