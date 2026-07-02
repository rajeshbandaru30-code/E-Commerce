const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Coupon = require('./models/Coupon');

dotenv.config();

const products = [
  // --- Clothing - Men ---
  { name: 'Men\'s Formal Shirt', description: 'Premium cotton formal shirt for men. Perfect for office and business meetings. Wrinkle-free fabric with smart fit.', price: 39.99, discount: 10, category: 'Clothing', brand: 'FormalWear', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', stock: 60 },
  { name: 'Men\'s Casual Shirt', description: 'Stylish casual shirt for men made from soft cotton blend. Great for everyday wear with jeans or chinos.', price: 29.99, discount: 0, category: 'Clothing', brand: 'CasualCo', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400', stock: 80 },
  { name: 'Men\'s Slim Fit Jeans', description: 'Modern slim fit jeans for men. Stretch denim fabric for all-day comfort. Available in dark blue and black.', price: 49.99, discount: 15, category: 'Clothing', brand: 'DenimCo', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400', stock: 45 },
  { name: 'Men\'s Leather Jacket', description: 'Genuine leather jacket for men with quilted lining. Classic biker style with YKK zippers.', price: 159.99, discount: 20, category: 'Clothing', brand: 'LeatherCraft', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', stock: 20 },
  { name: 'Men\'s Running Shoes', description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Ideal for daily runs and workouts.', price: 89.99, discount: 0, category: 'Sports', brand: 'RunFit', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', stock: 55 },
  { name: 'Men\'s Casual Sneakers', description: 'Trendy casual sneakers for men. Comfortable memory foam insole and durable rubber sole.', price: 59.99, discount: 10, category: 'Sports', brand: 'StepEasy', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400', stock: 70 },
  { name: 'Men\'s Cotton T-Shirt Pack', description: 'Pack of 3 premium cotton t-shirts. Soft, breathable, and pre-shrunk. Essential wardrobe staple.', price: 34.99, discount: 0, category: 'Clothing', brand: 'ComfortWear', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', stock: 100 },
  { name: 'Men\'s Hoodie', description: 'Warm fleece hoodie for men with kangaroo pocket and adjustable drawstring hood.', price: 44.99, discount: 5, category: 'Clothing', brand: 'UrbanGear', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', stock: 40 },

  // --- Clothing - Women ---
  { name: 'Women\'s Floral Dress', description: 'Beautiful floral print dress for women. Lightweight fabric with flattering A-line silhouette.', price: 49.99, discount: 15, category: 'Clothing', brand: 'FemmeStyle', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', stock: 35 },
  { name: 'Women\'s Handbag', description: 'Elegant handbag with gold-tone hardware. Spacious interior with multiple pockets and adjustable strap.', price: 69.99, discount: 0, category: 'Clothing', brand: 'LeatherCraft', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', stock: 30 },
  { name: 'Women\'s Yoga Leggings', description: 'High-waisted yoga leggings with moisture-wicking fabric. Squat-proof and perfect for workouts or lounging.', price: 39.99, discount: 10, category: 'Sports', brand: 'FlexiGrip', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400', stock: 65 },

  // --- Electronics ---
  { name: 'iPhone 15 Pro Max', description: 'Apple iPhone 15 Pro Max with A17 Pro chip, 48MP camera system, and titanium design. 256GB storage.', price: 1199.99, discount: 5, category: 'Electronics', brand: 'Apple', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', stock: 15 },
  { name: 'Samsung Galaxy S24 Ultra', description: 'Samsung Galaxy S24 Ultra with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor.', price: 1099.99, discount: 8, category: 'Electronics', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400', stock: 20 },
  { name: 'MacBook Air M3', description: 'Apple MacBook Air with M3 chip, 15.3-inch Liquid Retina display, 16GB RAM, 512GB SSD.', price: 1299.99, discount: 0, category: 'Electronics', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', stock: 12 },
  { name: 'Wireless Bluetooth Headphones', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Deep bass and comfortable over-ear design.', price: 79.99, discount: 15, category: 'Electronics', brand: 'SoundMax', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', stock: 50 },
  { name: 'Smart Watch Pro', description: 'Advanced smartwatch with heart rate monitoring, GPS, sleep analysis, and 7-day battery. Water resistant to 50m.', price: 199.99, discount: 10, category: 'Electronics', brand: 'TechWear', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', stock: 30 },
  { name: 'Wireless Charging Pad', description: 'Fast wireless charging pad for all Qi devices. Slim design with LED indicator and overcharge protection.', price: 29.99, discount: 0, category: 'Electronics', brand: 'TechWear', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', stock: 90 },
  { name: 'USB-C Hub Adapter', description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging. Compatible with laptops and tablets.', price: 34.99, discount: 0, category: 'Electronics', brand: 'ConnectPro', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400', stock: 75 },
  { name: 'Portable Bluetooth Speaker', description: 'Waterproof portable Bluetooth speaker with 360-degree sound. 12-hour battery life and built-in microphone.', price: 49.99, discount: 20, category: 'Electronics', brand: 'SoundMax', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', stock: 40 },

  // --- Home & Kitchen ---
  { name: 'Non-Stick Cookware Set', description: '10-piece non-stick cookware set. Even heat distribution, easy cleanup, dishwasher safe.', price: 149.99, discount: 25, category: 'Home & Kitchen', brand: 'KitchenElite', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', stock: 20 },
  { name: 'Stainless Steel Water Bottle', description: 'Double-wall insulated bottle keeps drinks cold 24hrs or hot 12hrs. BPA-free, leak-proof, 750ml.', price: 34.99, discount: 0, category: 'Home & Kitchen', brand: 'HydroLife', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', stock: 75 },
  { name: 'Coffee Maker Machine', description: 'Programmable coffee maker with 12-cup capacity. Auto-shutoff, brew strength selector, and permanent filter.', price: 59.99, discount: 10, category: 'Home & Kitchen', brand: 'BrewMaster', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', stock: 25 },
  { name: 'Air Purifier', description: 'HEPA air purifier for rooms up to 300 sq ft. Captures 99.97% of allergens, dust, and pet dander. Quiet operation.', price: 129.99, discount: 15, category: 'Home & Kitchen', brand: 'PureAir', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', stock: 18 },

  // --- Sports ---
  { name: 'Yoga Mat Premium', description: 'Extra thick 6mm yoga mat with non-slip surface. Includes carrying strap for easy transport.', price: 49.99, discount: 0, category: 'Sports', brand: 'FlexiGrip', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', stock: 60 },
  { name: 'Dumbbell Set 20kg', description: 'Adjustable dumbbell set from 2kg to 20kg. Space-saving design with secure locking mechanism.', price: 89.99, discount: 10, category: 'Sports', brand: 'IronFit', image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400', stock: 25 },
  { name: 'Exercise Resistance Bands', description: 'Set of 5 resistance bands with different tension levels. Includes door anchor, handles, and carry bag.', price: 24.99, discount: 0, category: 'Sports', brand: 'FlexiGrip', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', stock: 85 },

  // --- Books ---
  { name: 'JavaScript: The Complete Guide', description: 'Comprehensive guide to modern JavaScript. Covers ES6+, async/await, Node.js, React, and more.', price: 39.99, discount: 30, category: 'Books', brand: 'TechPress', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', stock: 45 },
  { name: 'Rich Dad Poor Dad', description: 'What the rich teach their kids about money that the poor and middle class do not. Personal finance classic.', price: 14.99, discount: 0, category: 'Books', brand: 'BestReads', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', stock: 100 },
  { name: 'Atomic Habits', description: 'An easy and proven way to build good habits and break bad ones. Bestselling guide to lasting change.', price: 16.99, discount: 10, category: 'Books', brand: 'BestReads', image: 'https://images.unsplash.com/photo-1589829085813-0164dd8c05f1?w=400', stock: 90 },
  { name: 'Python Crash Course', description: 'Fast-paced introduction to Python programming. Learn to build projects and automate tasks.', price: 29.99, discount: 20, category: 'Books', brand: 'TechPress', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400', stock: 55 },

  // --- Beauty ---
  { name: 'Face Moisturizer SPF 30', description: 'Daily facial moisturizer with SPF 30. Hyaluronic acid and vitamin E for hydrated, glowing skin.', price: 28.99, discount: 0, category: 'Beauty', brand: 'GlowUp', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', stock: 80 },
  { name: 'Perfume for Men', description: 'Long-lasting men\'s perfume with woody and citrus notes. Perfect for daily wear and special occasions.', price: 54.99, discount: 10, category: 'Beauty', brand: 'ScentPro', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400', stock: 35 },
  { name: 'Hair Dryer Professional', description: '2000W professional hair dryer with ionic technology. 3 heat settings, 2 speed settings, and concentrator nozzle.', price: 39.99, discount: 15, category: 'Beauty', brand: 'StylePro', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', stock: 40 },
  { name: 'Makeup Brush Set', description: '12-piece professional makeup brush set. Soft synthetic bristles with wooden handles. Includes carrying case.', price: 32.99, discount: 0, category: 'Beauty', brand: 'GlowUp', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', stock: 50 },

  // --- More Electronics ---
  { name: 'iPad Air 11-inch', description: 'Apple iPad Air with M2 chip, 11-inch Liquid Retina display, 128GB storage. Supports Apple Pencil Pro.', price: 749.99, discount: 0, category: 'Electronics', brand: 'Apple', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', stock: 18 },
  { name: 'Gaming Mouse RGB', description: 'High-precision gaming mouse with 16000 DPI optical sensor. Customizable RGB lighting and 8 programmable buttons.', price: 49.99, discount: 10, category: 'Electronics', brand: 'GameX', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', stock: 45 },
  { name: 'Mechanical Keyboard', description: 'RGB mechanical gaming keyboard with Cherry MX switches. Full-size with wrist rest and programmable keys.', price: 89.99, discount: 15, category: 'Electronics', brand: 'GameX', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', stock: 30 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const admin = await User.findOne({ email: 'admin@shopez.com' });
    if (!admin) {
      await User.create({ name: 'Admin', email: 'admin@shopez.com', password: 'admin123', role: 'admin' });
      console.log('Admin created: admin@shopez.com / admin123');
    } else {
      console.log('Admin already exists');
    }

    const buyer = await User.findOne({ email: 'buyer@test.com' });
    if (!buyer) {
      await User.create({ name: 'Test Buyer', email: 'buyer@test.com', password: 'test123', role: 'buyer' });
      console.log('Buyer created: buyer@test.com / test123');
    }

    let seller = await User.findOne({ email: 'seller@test.com' });
    if (!seller) {
      seller = await User.create({ name: 'Test Seller', email: 'seller@test.com', password: 'test123', role: 'seller' });
      console.log('Seller created: seller@test.com / test123');
    }

    const categoryNames = [...new Set(products.map((p) => p.category))];
    for (const name of categoryNames) {
      const exists = await Category.findOne({ name });
      if (!exists) {
        await Category.create({ name });
        console.log(`Category created: ${name}`);
      }
    }

    await Product.deleteMany({});
    for (const p of products) {
      await Product.create({ ...p, seller: seller._id });
    }
    console.log(`${products.length} sample products created`);

    const couponExists = await Coupon.findOne({ code: 'WELCOME10' });
    if (!couponExists) {
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);
      await Coupon.create({
        code: 'WELCOME10', discountType: 'percentage', discountValue: 10,
        minOrderValue: 20, maxDiscount: 50, usageLimit: 100, expiresAt: expiry,
      });
      console.log('Coupon created: WELCOME10 (10% off)');
    }

    console.log('\n=== Login Credentials ===');
    console.log('Admin:  admin@shopez.com / admin123');
    console.log('Buyer:  buyer@test.com  / test123');
    console.log('Seller: seller@test.com / test123');
    console.log('Coupon: WELCOME10 (10% off, max ₹50)');
    console.log('========================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
