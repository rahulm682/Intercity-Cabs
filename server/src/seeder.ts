import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import routes from './data/routes.js';
import User from './models/User.js';
import Route from './models/Route.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await Route.deleteMany();
    await User.deleteMany();

    // 2. Insert Users ONE BY ONE to trigger pre-save hooks (Hashing)
    // We cannot use insertMany here if we want the middleware to run
    let adminUser = null;
    
    for (const user of users) {
      const createdUser = await User.create(user);
      // Assume the first user in your list is the admin for linking routes
      if (!adminUser) adminUser = createdUser._id;
    }

    // 3. Link Routes to Admin
    const sampleRoutes = routes.map((route) => {
      return { ...route, user: adminUser };
    });

    // 4. Insert Routes (Routes don't have middleware, so insertMany is fine here)
    await Route.insertMany(sampleRoutes);

    console.log('✅ Data Imported Successfully (Passwords Hashed)!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Route.deleteMany();
    await User.deleteMany();

    console.log('🛑 Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}