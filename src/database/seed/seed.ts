import * as fs from 'node:fs';
import mongoose, { Schema, Types } from 'mongoose';

import { brandsData } from './data/brands.data.js';
import { categoriesData } from './data/categories.data.js';
import { getProductsData } from './data/products.data.js';
import { usersData } from './data/users.data.js';
import { getCartsData } from './data/carts.data.js';
import { getOrdersData } from './data/orders.data.js';

function loadEnv() {
  if (process.env.DB_URL) return;
  try {
    const envPath = new URL('../../../.env', import.meta.url).pathname;
    const normalized =
      envPath.startsWith('/') && envPath[2] === ':' ? envPath.slice(1) : envPath;
    if (fs.existsSync(normalized)) {
      const content = fs.readFileSync(normalized, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [key, ...rest] = trimmed.split('=');
        if (!key || rest.length === 0) continue;
        const value = rest.join('=').trim();
        if (!(key.trim() in process.env)) {
          process.env[key.trim()] = value;
        }
      }
    }
  } catch {
    // ignore
  }
}

loadEnv();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/on-commerce';

// Schemas for seeding (mirrors src schemas)
const BrandSeedSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: 'brands', versionKey: false },
);

const CategorySeedSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: 'categories', versionKey: false },
);

const ProductSeedSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    brand: { type: Types.ObjectId, ref: 'Brand' },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    imageCover: { type: String, required: true, trim: true },
    images: { type: [String], required: true },
    ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingsQuantity: { type: Number, default: 0, min: 0 },
    sold: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true, collection: 'products', versionKey: false, strict: false },
);

const UserSeedSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phoneNumber: { type: String, required: true, trim: true, unique: true },
    address: { type: String, required: true, trim: true },
    cart: { type: Types.ObjectId, ref: 'Cart' },
    orders: { type: Types.ObjectId, ref: 'Orders' },
  },
  { timestamps: true, collection: 'users', versionKey: false },
);

const CartSeedSchema = new Schema(
  {
    cartOwner: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    products: [
      {
        _id: false,
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalCartPrice: { type: Number, required: true, min: 0 },
    numOfCartItems: { type: Number, required: true, min: 0 },
  },
  { timestamps: true, collection: 'carts', versionKey: false },
);

const OrderSeedSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        _id: false,
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    totalQuantity: { type: Number, required: true, min: 0 },
    shippingAddress: { type: String, required: true, trim: true },
    paymentMethod: { type: String, enum: ['card', 'cash'], required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true, collection: 'orders', versionKey: false },
);

function inferCategorySlug(product: any): string {
  const text = `${product.title ?? ''} ${product.slug ?? ''} ${product.description ?? ''}`.toLowerCase();
  if (
    text.includes('lego') ||
    text.includes('technic') ||
    text.includes('toy') ||
    text.includes('bugatti') ||
    text.includes('police station')
  ) {
    return 'toys';
  }
  if (
    text.includes('nike') ||
    text.includes('adidas') ||
    text.includes('zara') ||
    text.includes('jeans') ||
    text.includes('blazer') ||
    text.includes('hoodie') ||
    text.includes('dri-fit') ||
    text.includes('air max') ||
    text.includes('ultraboost') ||
    text.includes('fashion') ||
    text.includes('shirt') ||
    text.includes('shoe')
  ) {
    return 'fashion';
  }
  if (
    text.includes('home') ||
    text.includes('furniture') ||
    text.includes('kitchen') ||
    text.includes('decor')
  ) {
    return 'home';
  }
  return 'electronics';
}

function inferBrandSlug(product: any): string | null {
  const text = `${product.title ?? ''} ${product.slug ?? ''}`.toLowerCase();
  if (text.includes('iphone') || text.includes('macbook') || text.includes('apple')) return 'apple';
  if (text.includes('galaxy') || text.includes('samsung') || text.includes('qled')) return 'samsung';
  if (text.includes('sony') || text.includes('playstation') || text.includes('wh-1000')) return 'sony';
  if (text.includes('nike')) return 'nike';
  if (text.includes('adidas')) return 'adidas';
  if (text.includes('dell') || text.includes('xps') || text.includes('ultrasharp')) return 'dell';
  if (text.includes('zara')) return 'zara';
  if (text.includes('lego')) return 'lego';
  return null;
}

async function seed() {
  console.log(`Connecting to ${DB_URL} ...`);
  await mongoose.connect(DB_URL);
  console.log('Connected.');

  const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSeedSchema);
  const Category = mongoose.models.Category || mongoose.model('Category', CategorySeedSchema);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSeedSchema);
  const User = mongoose.models.User || mongoose.model('User', UserSeedSchema);
  const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSeedSchema);
  const Order = mongoose.models.Orders || mongoose.model('Orders', OrderSeedSchema);

  try {
    const existingProducts = await Product.find().lean();
    console.log(`Found ${existingProducts.length} existing products.`);

    if (existingProducts.length === 0) {
      // Fresh DB: seed brands, categories and products together (brands feat behavior)
      console.log('Clearing existing data ...');
      await Promise.all([Brand.deleteMany({}), Category.deleteMany({}), Product.deleteMany({})]);

      console.log('Seeding brands ...');
      const insertedBrands = await Brand.insertMany(brandsData);
      console.log(`  Inserted ${insertedBrands.length} brands`);

      console.log('Seeding categories ...');
      const insertedCategories = await Category.insertMany(categoriesData);
      console.log(`  Inserted ${insertedCategories.length} categories`);

      const brandMap: Record<string, Types.ObjectId> = {};
      for (const b of insertedBrands) {
        brandMap[b.slug] = b._id as Types.ObjectId;
      }
      const categoryMap: Record<string, Types.ObjectId> = {};
      for (const c of insertedCategories) {
        categoryMap[c.slug] = c._id as Types.ObjectId;
      }

      const productsData = getProductsData(brandMap, categoryMap);
      console.log('Seeding products (with brand & category relations) ...');
      const insertedProducts = await Product.insertMany(productsData);
      console.log(`  Inserted ${insertedProducts.length} products`);

      console.log('\nSeed completed successfully!');
      console.log(`  Brands: ${insertedBrands.length}`);
      console.log(`  Categories: ${insertedCategories.length}`);
      console.log(`  Products: ${insertedProducts.length}`);
      console.log('\nBrands with product counts:');
      for (const brand of insertedBrands) {
        const count = insertedProducts.filter((p) => String(p.brand) === String(brand._id)).length;
        console.log(`  - ${brand.name} (${brand.slug}): ${count} products`);
      }
    } else {
      // Existing products: seed categories/brands from products and update links (categories feat behavior)
      // Determine needed categories and brands from products
      const neededCategorySlugs = new Set<string>();
      const neededBrandSlugs = new Set<string>();
      for (const p of existingProducts) {
        neededCategorySlugs.add(inferCategorySlug(p));
        const b = inferBrandSlug(p);
        if (b) neededBrandSlugs.add(b);
      }
      console.log(`Categories inferred from products: ${[...neededCategorySlugs].join(', ')}`);
      console.log(`Brands inferred from products: ${[...neededBrandSlugs].join(', ')}`);

      const filteredCategories = categoriesData.filter((c) => neededCategorySlugs.has(c.slug));
      const filteredBrands = brandsData.filter((b) => neededBrandSlugs.has(b.slug));

      console.log('Seeding categories (using products to determine required categories) ...');
      await Category.deleteMany({ slug: { $in: [...neededCategorySlugs] } });
      const insertedCategories = filteredCategories.length
        ? await Category.insertMany(filteredCategories)
        : [];

      console.log('Seeding brands (using products to determine required brands) ...');
      await Brand.deleteMany({ slug: { $in: [...neededBrandSlugs] } });
      const insertedBrands = filteredBrands.length ? await Brand.insertMany(filteredBrands) : [];

      // Build maps from all brands/categories (including pre-existing not in needed set)
      const allCategories = await Category.find().lean();
      const allBrands = await Brand.find().lean();
      const categoryMap: Record<string, Types.ObjectId> = {};
      for (const c of allCategories) categoryMap[c.slug] = c._id as Types.ObjectId;
      const brandMap: Record<string, Types.ObjectId> = {};
      for (const b of allBrands) brandMap[b.slug] = b._id as Types.ObjectId;

      console.log('Assigning categories & brands to existing products (no new products created) ...');
      const bulkOps: any[] = [];
      const catStats: Record<string, number> = {};
      const brandStats: Record<string, number> = {};

      for (const p of existingProducts) {
        const catSlug = inferCategorySlug(p);
        const brandSlug = inferBrandSlug(p);
        const catId = categoryMap[catSlug];
        const brandId = brandSlug ? brandMap[brandSlug] : null;
        if (catId) catStats[catSlug] = (catStats[catSlug] ?? 0) + 1;
        if (brandSlug && brandId) brandStats[brandSlug] = (brandStats[brandSlug] ?? 0) + 1;

        const update: any = {};
        if (catId && (!p.category || String(p.category) !== String(catId))) update.category = catId;
        if (brandId && (!p.brand || String(p.brand) !== String(brandId))) update.brand = brandId;
        if (Object.keys(update).length > 0) {
          bulkOps.push({
            updateOne: { filter: { _id: p._id }, update: { $set: update } },
          });
        }
      }

      if (bulkOps.length > 0) {
        const result = await Product.bulkWrite(bulkOps);
        console.log(`  Updated ${result.modifiedCount} products with category/brand assignment`);
      } else {
        console.log('  All products already have correct assignments');
      }

      console.log('\nSeed completed successfully!');
      console.log(`  Categories: ${allCategories.length} (${[...neededCategorySlugs].join(', ')})`);
      console.log(`  Brands: ${allBrands.length} (${[...neededBrandSlugs].join(', ')})`);
      console.log(`  Products linked: ${existingProducts.length} (no new products created)`);
      console.log('\nCategory -> product counts:');
      for (const slug of neededCategorySlugs) console.log(`  - ${slug}: ${catStats[slug] ?? 0} products`);
      console.log('\nBrand -> product counts:');
      for (const slug of neededBrandSlugs) console.log(`  - ${slug}: ${brandStats[slug] ?? 0} products`);
    }

    console.log('\nSeeding users ...');
    await User.deleteMany({});
    const insertedUsers = await User.insertMany(usersData);
    console.log(`  Inserted ${insertedUsers.length} users`);

    const allProducts = await Product.find().select('price').lean();
    if (allProducts.length === 0) {
      console.log('\nSkipping carts & orders: no products available to reference.');
    } else {
      console.log('\nSeeding carts & orders ...');
      await Promise.all([Cart.deleteMany({}), Order.deleteMany({})]);
      await Cart.syncIndexes();

      const usersForRefs = insertedUsers.map((u) => ({
        _id: u._id as Types.ObjectId,
        address: u.address,
      }));
      const productsForRefs = allProducts.map((p) => ({
        _id: p._id as Types.ObjectId,
        price: p.price,
      }));

      const insertedCarts = await Cart.insertMany(
        getCartsData(usersForRefs, productsForRefs),
      );
      const insertedOrders = await Order.insertMany(
        getOrdersData(usersForRefs, productsForRefs),
      );
      console.log(`  Inserted ${insertedCarts.length} carts`);
      console.log(`  Inserted ${insertedOrders.length} orders`);

      const cartByUser = new Map(
        insertedCarts.map((c) => [String(c.cartOwner), c._id]),
      );
      const orderByUser = new Map(
        insertedOrders.map((o) => [String(o.user), o._id]),
      );

      const userOps = insertedUsers.map((u) => ({
        updateOne: {
          filter: { _id: u._id },
          update: {
            $set: {
              cart: cartByUser.get(String(u._id)),
              orders: orderByUser.get(String(u._id)),
            },
          },
        },
      }));
      await User.bulkWrite(userOps);
      console.log('  Linked carts & orders to users');
    }
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

await seed();
