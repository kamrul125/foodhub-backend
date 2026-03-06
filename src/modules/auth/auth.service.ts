import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client"; // ১. Role Enum টি ইমপোর্ট করুন
import prisma from "../../config/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// ২. role এর টাইপ string এর বদলে Role করে দিন
export const registerUser = async (name: string, email: string, password: string, role: Role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: { 
      name, 
      email, 
      password: hashedPassword, 
      role // এখন আর টাইপ নিয়ে সমস্যা হবে না
    }
  });
  
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  // টোকেনের ভেতরেও ইউজার রোল পাস করা হচ্ছে
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  
  return { token, user };
};