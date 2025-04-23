import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: JwtPayload;
}

// @desc Register a new user
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user);
    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token,
    });
})

// @desc Login a user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter both email and password");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user);
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            token,
        });

    }
    else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

// @desc Get current user
// @route GET /api/user/current
// @access Private
const currentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user || !req.user.id) {
        res.status(401);  // Unauthorized if user is not in the request or doesn't have an id
        throw new Error('User not authenticated');
    }

    const user = await User.findById(req.user.id).select('_id name email');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        user_id: user._id,
        name: user.name,
        email: user.email
    });
});

export { registerUser, loginUser, currentUser };
