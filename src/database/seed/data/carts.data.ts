import { Types } from 'mongoose';

type UserLike = { _id: Types.ObjectId; address: string };
type ProductLike = { _id: Types.ObjectId; price: number };

export const getCartsData = (
  users: UserLike[],
  products: ProductLike[],
) =>
  users.map((user, index) => {
    const first = products[index % products.length];
    const second = products[(index * 3 + 1) % products.length];

    const items = [
      { product: first._id, quantity: (index % 3) + 1, price: first.price },
    ];
    if (index % 2 === 0) {
      items.push({
        product: second._id,
        quantity: (index % 2) + 1,
        price: second.price,
      });
    }

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      user: user._id,
      items,
      totalPrice,
      totalQuantity,
    };
  });
