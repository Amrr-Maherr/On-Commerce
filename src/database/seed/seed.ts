import * as fs from 'node:fs';
import mongoose, { Schema, Types } from 'mongoose';

import { brandsData } from './data/brands.data.js';
import { categoriesData } from './data/categories.data.js';
import { getProductsData } from './data/products.data.js';

function loadEnv() {
  if (process.env.DB_URL) return;
  try {
    const envPath = new URL('../../../.env', import.meta.url).pathname;
    // On Windows, pathname starts with /D:/... need to handle
    const normalized = envPath.startsWith('/') && envPath[2] === ':' ? envPath.slice(1) : envPath;
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

// Minimal schemas for seeding (mirrors src/schemas)
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
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    image: { type: String, required: true },
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
  { timestamps: true, collection: 'products', versionKey: false },
);

async function seed() {
  console.log(`Connecting to ${DB_URL} ...`);
  await mongoose.connect(DB_URL);
  console.log('Connected.');

  const Brand = mongoose.models.Brand || mongoose.model('Brand', BrandSeedSchema);
  const Category = mongoose.models.Category || mongoose.model('Category', CategorySeedSchema);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSeedSchema);

  try {
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
      const count = insertedProducts.filter(
        (p) => String(p.brand) === String(brand._id),
      ).length;
      console.log(`  - ${brand.name} (${brand.slug}): ${count} products`);
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
