import { Order } from './order.schema.js';

export async function getOrders() {
  return Order.find()
    .populate('user', 'name email')
    .populate('items.product', 'title price imageCover');
}

export async function createOrder(data: any) {
  return Order.create(data);
}

export async function updateOrder(id: string, data: any) {
  return Order.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteOrder(id: string) {
  return Order.findByIdAndDelete(id);
}

export async function singleOrder(id: string) {
  return Order.findById(id)
    .populate('user', 'name email')
    .populate('items.product', 'title price imageCover');
}
