import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserType } from '../types/user';

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined. Please set it before starting the application.');
}
const JWT_SECRET: string = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (user: UserType): string => {
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export default generateToken;
