import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';

if (!ACCESS_TOKEN_SECRET) {
    console.error('ACCESS_TOKEN_SECRET is not defined in the environment variables');
}

interface AuthRequest extends Request {
    user?: jwt.JwtPayload;
}

const BEARER_PREFIX = 'Bearer ';

const validateToken = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string | undefined;

    // Check if authorization header exists
    if (!authHeader) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
        return;
    }

    // Check if authorization header starts with 'Bearer'
    if (!authHeader.startsWith(BEARER_PREFIX)) {
        res.status(401).json({ message: 'Not authorized, invalid token format' });
        return;
    }

    // Extract token from the authorization header
    const token = authHeader.slice(BEARER_PREFIX.length);

    // Check if token is empty
    if (!token) {
        res.status(401).json({ message: 'Not authorized, token is empty' });
        return;
    }

    try {
        // Verify token using the secret key
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;
        req.user = decoded;  // Attach user information to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(401).json({ message: 'Not authorized, token verification failed', error: errorMessage });
    }
});

export default validateToken;
