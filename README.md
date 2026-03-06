FoodHub - Backend API:
FoodHub Backend হলো একটি রিলায়েবল এবং স্কেলেবল REST API, যা টাইপস্ক্রিপ্ট (TypeScript) ব্যবহার করে তৈরি করা হয়েছে। এটি একটি অনলাইন ফুড ডেলিভারি সিস্টেমের ব্যাকএন্ড হিসেবে কাজ করে যেখানে ইউজার, সেলার এবং অ্যাডমিনের জন্য রোল-বেজড এক্সেস কন্ট্রোল রয়েছে।


টেকনোলজি স্ট্যাক (Tech Stack):

Runtime: Node.js
Framework: Express.js
Language: TypeScript
ORM: Prisma
Database: PostgreSQL
Security: JWT (JSON Web Token) & Bcrypt


মূল বৈশিষ্ট্যসমূহ (Features):

User Auth: নিরাপদ রেজিস্ট্রেশন এবং লগইন সিস্টেম।
Role Management: ৩টি নির্দিষ্ট রোল (Customer, Provider/Seller, Admin)।
Food CRUD: সেলাররা খাবার যোগ, আপডেট এবং ডিলিট করতে পারেন।
Order Management: কাস্টমাররা অর্ডার করতে পারেন এবং তাদের অর্ডারের ইতিহাস দেখতে পারেন।
Admin Dashboard: অ্যাডমিন সব ইউজার এবং অর্ডার মনিটর করতে পারেন।

এনভায়রনমেন্ট ভেরিয়েবল (.env):

DATABASE_URL="postgresql://neondb_owner:npg_wQHx2CorK1Tu@ep-aged-dew-ainurv4u-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="my_super_secret_key_123_hub"
PORT=5000

API Endpoints (Endpoints Preview):

Method,Endpoint,Description,Access
POST,/api/auth/register,Register a new user,Public
POST,/api/auth/login,User login,Public
GET,/api/foods,Get all food items,Public
POST,/api/foods,Add new food,Seller
GET,/api/orders/my-orders,User's order list,Customer
GET,/api/admin/orders,View all orders,Admin

রান করার নিয়ম:

1.ডিপেন্ডেন্সি ইনস্টল
npm install

2.প্রিজমা মাইগ্রেশন
npx prisma migrate dev

3.সার্ভার চালু
npm run dev

লেখক (Author)
Md Kamruzzaman

Github link : 