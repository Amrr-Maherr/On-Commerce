import * as fs from 'node:fs';
import mongoose, { Schema, Types } from 'mongoose';

import { categoriesData } from './data/categories.data.js';

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

const CategorySeedSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: 'categories', versionKey: false },
);

// Minimal Product schema for seeding - do not modify actual Product schema, use only for read/update
const ProductSeedSchema = new Schema(
  {
    title: String,
    slug: String,
    description: String,
    category: { type: Types.ObjectId, ref: 'Category' },
    brand: { type: Types.ObjectId, ref: 'Brand' },
  },
  { strict: false, collection: 'products', versionKey: false },
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
  // Default to electronics for tech products
  return 'electronics';
}

async function seed() {
  console.log(`Connecting to ${DB_URL} ...`);
  await mongoose.connect(DB_URL);
  console.log('Connected.');

  const Category = mongoose.models.Category || mongoose.model('Category', CategorySeedSchema);
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSeedSchema);

  try {
    const products = await Product.find().lean();
    console.log(`Found ${products.length} existing products.`);

    if (products.length === 0) {
      console.log('No products found. Seeding default categories without product assignment.');
      await Category.deleteMany({});
      const inserted = await Category.insertMany(categoriesData);
      console.log(`Inserted ${inserted.length} categories: ${inserted.map((c) => c.slug).join(', ')}`);
      console.log('Seed completed (no products to link).');
      return;
    }

    // Determine which categories are actually needed based on existing products
    const neededSlugs = new Set<string>();
    for (const p of products) {
      neededSlugs.add(inferCategorySlug(p));
    }
    console.log(`Categories inferred from products: ${[...neededSlugs].join(', ')}`);

    const filteredCategoriesData = categoriesData.filter((c) => neededSlugs.has(c.slug));

    // Ensure all needed categories exist (upsert)
    console.log('Seeding categories (using products to determine required categories) ...');
    // Clear only categories that will be re-created to keep idempotency without deleting unrelated categories
    // For seed idempotency we delete and re-insert needed categories
    await Category.deleteMany({ slug: { $in: [...neededSlugs] } });

    const insertedCategories = await Category.insertMany(filteredCategoriesData);
    console.log(`  Inserted ${insertedCategories.length} categories`);

    const categoryMap: Record<string, Types.ObjectId> = {};
    for (const c of insertedCategories) {
      categoryMap[c.slug] = c._id as Types.ObjectId;
    }

    // Also fetch any pre-existing categories that were not deleted (if seed re-run)
    const existingOthers = await Category.find({ slug: { $nin: [...neededSlugs] } }).lean();
    for (const c of existingOthers) {
      categoryMap[c.slug] = c._id as Types.ObjectId;
    }

    console.log('Assigning categories to existing products (no new products created) ...');
    const bulkOps: any[] = [];
    const stats: Record<string, number> = {};

    for (const p of products) {
      const targetSlug = inferCategorySlug(p);
      const targetId = categoryMap[targetSlug];
      if (!targetId) continue;
      stats[targetSlug] = (stats[targetSlug] ?? 0) + 1;

      // Only update if product category differs or is missing
      if (!p.category || String(p.category) !== String(targetId)) {
        bulkOps.push({
          updateOne: {
            filter: { _id: p._id },
            update: { $set: { category: targetId } },
          },
        });
      }
    }

    if (bulkOps.length > 0) {
      const result = await Product.bulkWrite(bulkOps);
      console.log(`  Updated ${result.modifiedCount} products with category assignment`);
    } else {
      console.log('  All products already have correct category assignment');
    }

    console.log('\nSeed completed successfully!');
    console.log(`  Categories: ${insertedCategories.length} (${[...neededSlugs].join(', ')})`);
    console.log(`  Products linked: ${products.length} (no new products created)`);
    console.log('\nCategory -> product counts (inferred from existing products):');
    for (const slug of neededSlugs) {
      console.log(`  - ${slug}: ${stats[slug] ?? 0} products`);
    }

    // Verification: show product -> category links
    const updatedProducts = await Product.find().select('title slug category').populate('category', 'name slug').lean();
    console.log('\nSample product assignments:');
    for (const p of updatedProducts.slice(0, 5)) {
      const cat: any = p.category;
      console.log(`  - ${p.title} (${p.slug}) => ${cat?.slug ?? cat}`);
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
