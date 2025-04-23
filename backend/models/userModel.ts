import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please add the user name."],
    },
    email: {
        type: String,
        required: [true, "Please add the user email."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add the user password."],
    },
},
    {
        timestamps: true,
    })

const User = mongoose.model<IUser>("User", userSchema);
export default User;