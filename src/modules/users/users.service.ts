import { User } from './user.schema.js';

export async function getUsers() {
  return User.find().select('name email phoneNumber address');
}

export async function createUser(data: any) {
  return User.create(data);
}

export async function updateUser(id: string, data: any) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}

export async function singleUser(id: string) {
  return User.findById(id)
    .populate({
      path: 'cart',
      populate: { path: 'products.product', select: 'title price imageCover' },
    })
    .populate({
      path: 'orders',
      populate: { path: 'items.product', select: 'title price imageCover' },
    });
}
