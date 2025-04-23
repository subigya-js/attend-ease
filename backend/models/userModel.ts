import mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserType } from "../types/user";

const userSchema: Schema<UserType> = new Schema({
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

const User = mongoose.model<UserType>("User", userSchema);
export default User;