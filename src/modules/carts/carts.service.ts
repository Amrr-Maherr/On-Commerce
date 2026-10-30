import { Cart } from './cart.schema.js';

export async function getCarts() {
  return Cart.find()
    .populate('cartOwner', 'name email')
    .populate('products.product', 'title price imageCover');
}

export async function createCart(data: any) {
  return Cart.create(data);
}

export async function updateCart(id: string, data: any) {
  return Cart.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteCart(id: string) {
  return Cart.findByIdAndDelete(id);
}

export async function singleCart(id: string) {
  return Cart.findById(id)
    .populate('cartOwner', 'name email')
    .populate('products.product', 'title price imageCover');
}
