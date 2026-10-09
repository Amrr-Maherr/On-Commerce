import { Types } from 'mongoose';

type UserLike = { _id: Types.ObjectId; address: string };
type ProductLike = { _id: Types.ObjectId; price: number };

const ORDER_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export const getOrdersData = (
  users: UserLike[],
  products: ProductLike[],
) =>
  users.map((user, index) => {
    const first = products[(index + 4) % products.length];
    const second = products[(index * 5 + 2) % products.length];

    const items = [
      { product: first._id, quantity: (index % 3) + 1, price: first.price },
    ];
    if (index % 3 !== 0) {
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
    const status = ORDER_STATUSES[index % ORDER_STATUSES.length];
    const isPaid = status !== 'pending' && status !== 'cancelled';

    return {
      user: user._id,
      items,
      totalPrice,
      totalQuantity,
      shippingAddress: user.address,
      paymentMethod: index % 2 === 0 ? 'card' : 'cash',
      status,
      isPaid,
      paidAt: isPaid ? new Date() : undefined,
    };
  });
