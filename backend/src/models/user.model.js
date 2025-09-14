import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs"
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
    , bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    timestamps: true
})
// You can add pre-save logic here if needed, otherwise remove this hook.
// Example of a valid pre-save hook (currently does nothing):
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const User = mongoose.model("User", userSchema);