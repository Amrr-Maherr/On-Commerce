import type { Request } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { validateCreateCart } from './carts/cart.validator.js';
import { validateCreateOrder } from './orders/order.validator.js';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from './products/product.validator.js';
import { validateCreateUser } from './users/user.validator.js';

const validId = '507f1f77bcf86cd799439011';

async function validate(chains: ValidationChain[], body: any) {
  const req = { body, params: {}, query: {} } as Request;

  for (const chain of chains) {
    await chain.run(req);
  }

  return validationResult(req)
    .array()
    .map((error) => error.msg);
}

describe('request validation', () => {
  it('accepts a valid product', async () => {
    const errors = await validate(validateCreateProduct, {
      title: 'Phone',
      slug: 'phone',
      description: 'A phone',
      category: validId,
      price: 10,
      quantity: 2,
      imageCover: 'phone.jpg',
      images: ['phone-1.jpg'],
    });

    expect(errors).toEqual([]);
  });

  it('reports missing product fields', async () => {
    const errors = await validate(validateCreateProduct, {
      title: 'Phone',
    });

    expect(errors.length).toBeGreaterThan(0);
  });

  it('allows partial product updates', async () => {
    const errors = await validate(validateUpdateProduct, {
      price: 5,
    });

    expect(errors).toEqual([]);
  });

  it('accepts a valid user', async () => {
    const errors = await validate(validateCreateUser, {
      name: 'Ali',
      email: 'ali@example.com',
      phoneNumber: '+201001234501',
      address: 'Cairo',
    });

    expect(errors).toEqual([]);
  });

  it('rejects invalid user fields', async () => {
    const errors = await validate(validateCreateUser, {
      name: 'A',
      email: 'not-an-email',
      phoneNumber: '123',
      address: '',
    });

    expect(errors.length).toBeGreaterThan(0);
  });

  it('accepts a valid cart', async () => {
    const errors = await validate(validateCreateCart, {
      cartOwner: validId,
      products: [{ product: validId, quantity: 1, price: 10 }],
    });

    expect(errors).toEqual([]);
  });

  it('accepts a valid order', async () => {
    const errors = await validate(validateCreateOrder, {
      user: validId,
      items: [{ product: validId, quantity: 1, price: 10 }],
      shippingAddress: 'Cairo',
      paymentMethod: 'cash',
    });

    expect(errors).toEqual([]);
  });
});
