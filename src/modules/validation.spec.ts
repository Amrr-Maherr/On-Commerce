import type { Request } from 'express';
import { matchedData, ValidationChain, validationResult } from 'express-validator';
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

  const result = validationResult(req);

  return {
    errors: result.array().map((error) => error.msg),
    data: matchedData(req, { locations: ['body'] }),
  };
}

describe('request validation', () => {
  it('accepts a valid product', async () => {
    const result = await validate(validateCreateProduct, {
      title: 'Phone',
      slug: 'phone',
      description: 'A phone',
      category: validId,
      price: 10,
      quantity: 2,
      imageCover: 'phone.jpg',
      images: ['phone-1.jpg'],
    });

    expect(result.errors).toEqual([]);
    expect(result.data.title).toBe('Phone');
  });

  it('reports missing product fields and strips unknown fields', async () => {
    const result = await validate(validateCreateProduct, {
      title: 'Phone',
      extra: 'ignored',
    });

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.data.extra).toBeUndefined();
  });

  it('allows partial product updates and keeps only provided fields', async () => {
    const result = await validate(validateUpdateProduct, {
      price: 5,
      extra: 'ignored',
    });

    expect(result.errors).toEqual([]);
    expect(result.data).toEqual({ price: 5 });
  });

  it('accepts a valid user', async () => {
    const result = await validate(validateCreateUser, {
      name: 'Ali',
      email: 'ali@example.com',
      phoneNumber: '+201001234501',
      address: 'Cairo',
    });

    expect(result.errors).toEqual([]);
  });

  it('rejects invalid user fields', async () => {
    const result = await validate(validateCreateUser, {
      name: 'A',
      email: 'not-an-email',
      phoneNumber: '123',
      address: '',
    });

    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('accepts a valid cart', async () => {
    const result = await validate(validateCreateCart, {
      cartOwner: validId,
      products: [{ product: validId, quantity: 1, price: 10 }],
    });

    expect(result.errors).toEqual([]);
    expect(result.data.products).toEqual([
      { product: validId, quantity: 1, price: 10 },
    ]);
  });

  it('accepts a valid order', async () => {
    const result = await validate(validateCreateOrder, {
      user: validId,
      items: [{ product: validId, quantity: 1, price: 10 }],
      shippingAddress: 'Cairo',
      paymentMethod: 'cash',
    });

    expect(result.errors).toEqual([]);
  });
});
