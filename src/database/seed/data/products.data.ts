import { Types } from 'mongoose';

type BrandMap = Record<string, Types.ObjectId>;
type CategoryMap = Record<string, Types.ObjectId>;

export const getProductsData = (
  brandMap: BrandMap,
  categoryMap: CategoryMap,
) => [
  // Apple - Electronics
  {
    title: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    description:
      'Apple iPhone 15 Pro with A17 Pro chip, titanium design and advanced camera system.',
    category: categoryMap['electronics'],
    brand: brandMap['apple'],
    price: 999,
    quantity: 50,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/iphone-15-pro-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/iphone-15-pro-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/iphone-15-pro-2.jpg',
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 320,
    sold: 1200,
  },
  {
    title: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    description:
      'Apple MacBook Air with M3 chip, 13.6-inch Liquid Retina display and all-day battery life.',
    category: categoryMap['electronics'],
    brand: brandMap['apple'],
    price: 1199,
    quantity: 30,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/macbook-air-m3-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/macbook-air-m3-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/macbook-air-m3-2.jpg',
    ],
    ratingsAverage: 4.9,
    ratingsQuantity: 210,
    sold: 850,
  },
  // Samsung - Electronics / Home
  {
    title: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description:
      'Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera and S Pen support.',
    category: categoryMap['electronics'],
    brand: brandMap['samsung'],
    price: 1299,
    quantity: 40,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/galaxy-s24-ultra-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/galaxy-s24-ultra-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/galaxy-s24-ultra-2.jpg',
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 180,
    sold: 950,
  },
  {
    title: 'Samsung QLED 55 Inch TV',
    slug: 'samsung-qled-55-inch-tv',
    description:
      'Samsung 55-inch QLED 4K Smart TV with Quantum Dot technology and HDR.',
    category: categoryMap['electronics'],
    brand: brandMap['samsung'],
    price: 799,
    quantity: 20,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/samsung-qled-tv-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/samsung-qled-tv-1.jpg',
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 95,
    sold: 400,
  },
  // Sony - Electronics
  {
    title: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    description:
      'Industry-leading noise cancellation with auto NC optimizer and 30-hour battery life.',
    category: categoryMap['electronics'],
    brand: brandMap['sony'],
    price: 399,
    quantity: 60,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/sony-wh1000xm5-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/sony-wh1000xm5-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/sony-wh1000xm5-2.jpg',
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 540,
    sold: 2100,
  },
  {
    title: 'Sony PlayStation 5',
    slug: 'sony-playstation-5',
    description:
      'Next-gen gaming console with ultra-high speed SSD and DualSense wireless controller.',
    category: categoryMap['electronics'],
    brand: brandMap['sony'],
    price: 499,
    quantity: 25,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/ps5-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/ps5-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/ps5-2.jpg',
    ],
    ratingsAverage: 4.9,
    ratingsQuantity: 890,
    sold: 5000,
  },
  // Nike - Fashion
  {
    title: 'Nike Air Max 270',
    slug: 'nike-air-max-270',
    description:
      'Nike Air Max 270 with large-volume Max Air unit and breathable mesh upper.',
    category: categoryMap['fashion'],
    brand: brandMap['nike'],
    price: 160,
    quantity: 100,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/nike-air-max-270-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/nike-air-max-270-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/nike-air-max-270-2.jpg',
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 310,
    sold: 1800,
  },
  {
    title: 'Nike Dri-FIT T-Shirt',
    slug: 'nike-dri-fit-t-shirt',
    description:
      'Lightweight Dri-FIT training t-shirt with sweat-wicking technology.',
    category: categoryMap['fashion'],
    brand: brandMap['nike'],
    price: 35,
    quantity: 200,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/nike-dri-fit-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/nike-dri-fit-1.jpg',
    ],
    ratingsAverage: 4.4,
    ratingsQuantity: 120,
    sold: 900,
  },
  // Adidas - Fashion
  {
    title: 'Adidas Ultraboost 22',
    slug: 'adidas-ultraboost-22',
    description:
      'Ultraboost 22 running shoes with responsive Boost midsole and Primeknit upper.',
    category: categoryMap['fashion'],
    brand: brandMap['adidas'],
    price: 190,
    quantity: 80,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/adidas-ultraboost-22-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/adidas-ultraboost-22-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/adidas-ultraboost-22-2.jpg',
    ],
    ratingsAverage: 4.6,
    ratingsQuantity: 260,
    sold: 1300,
  },
  {
    title: 'Adidas Essentials Hoodie',
    slug: 'adidas-essentials-hoodie',
    description:
      'Comfortable fleece hoodie with kangaroo pocket and ribbed cuffs.',
    category: categoryMap['fashion'],
    brand: brandMap['adidas'],
    price: 70,
    quantity: 150,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/adidas-hoodie-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/adidas-hoodie-1.jpg',
    ],
    ratingsAverage: 4.3,
    ratingsQuantity: 85,
    sold: 600,
  },
  // Dell - Electronics
  {
    title: 'Dell XPS 13 Laptop',
    slug: 'dell-xps-13-laptop',
    description:
      'Dell XPS 13 with Intel Core i7, 16GB RAM, 512GB SSD and InfinityEdge display.',
    category: categoryMap['electronics'],
    brand: brandMap['dell'],
    price: 1099,
    quantity: 35,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/dell-xps-13-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/dell-xps-13-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/dell-xps-13-2.jpg',
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 140,
    sold: 700,
  },
  {
    title: 'Dell UltraSharp 27 Monitor',
    slug: 'dell-ultrasharp-27-monitor',
    description:
      '27-inch 4K UltraSharp monitor with InfinityEdge and USB-C connectivity.',
    category: categoryMap['electronics'],
    brand: brandMap['dell'],
    price: 449,
    quantity: 45,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/dell-ultrasharp-27-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/dell-ultrasharp-27-1.jpg',
    ],
    ratingsAverage: 4.8,
    ratingsQuantity: 110,
    sold: 350,
  },
  // Zara - Fashion
  {
    title: 'Zara Slim Fit Jeans',
    slug: 'zara-slim-fit-jeans',
    description:
      'High-waisted slim fit jeans with five pockets and stretch denim.',
    category: categoryMap['fashion'],
    brand: brandMap['zara'],
    price: 49,
    quantity: 300,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/zara-jeans-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/zara-jeans-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/zara-jeans-2.jpg',
    ],
    ratingsAverage: 4.2,
    ratingsQuantity: 70,
    sold: 1100,
  },
  {
    title: 'Zara Linen Blazer',
    slug: 'zara-linen-blazer',
    description:
      'Tailored linen-blend blazer with notched lapel and front buttons.',
    category: categoryMap['fashion'],
    brand: brandMap['zara'],
    price: 89,
    quantity: 120,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/zara-blazer-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/zara-blazer-1.jpg',
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 55,
    sold: 480,
  },
  // Lego - Toys
  {
    title: 'Lego Technic Bugatti Chiron',
    slug: 'lego-technic-bugatti-chiron',
    description:
      'LEGO Technic Bugatti Chiron 1:8 scale model with W16 engine and 8-speed gearbox.',
    category: categoryMap['toys'],
    brand: brandMap['lego'],
    price: 399,
    quantity: 50,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/lego-bugatti-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/lego-bugatti-1.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/products/lego-bugatti-2.jpg',
    ],
    ratingsAverage: 4.9,
    ratingsQuantity: 310,
    sold: 1500,
  },
  {
    title: 'Lego City Police Station',
    slug: 'lego-city-police-station',
    description:
      'LEGO City Police Station with jail, watchtower and 5 minifigures.',
    category: categoryMap['toys'],
    brand: brandMap['lego'],
    price: 99,
    quantity: 90,
    imageCover: 'https://res.cloudinary.com/demo/image/upload/v1/products/lego-police-station-cover.jpg',
    images: [
      'https://res.cloudinary.com/demo/image/upload/v1/products/lego-police-station-1.jpg',
    ],
    ratingsAverage: 4.7,
    ratingsQuantity: 180,
    sold: 850,
  },
];
