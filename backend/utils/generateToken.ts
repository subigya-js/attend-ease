import jwt from 'jsonwebtoken';
import { UserType } from '../types/user';

const JWT_SECRET: string = process.env.JWT_SECRET || 'fallback_secret';

const generateToken = (user: UserType): string => {
  return jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export default generateToken;
