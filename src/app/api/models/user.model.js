import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const contactSchema = new Schema({
    phone: {
        type: String,  // Changed to String for phone number
        required: true,
        minlength: [10, 'Phone number must be 10 digits'],
        maxlength: [10, 'Phone number must be 10 digits'],
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,  // Changed to String for pincode
            required: true,
            minlength: [6, 'Pincode should be 6 digits'],
            maxlength: [6, 'Pincode should be 6 digits'],
        },
    },
});

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required !!"],
            minlength: [3, 'Minimum 3 characters are required !'],
            maxlength: [27, 'Maximum 27 characters allowed !'],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required !!"],
        },
        fullName: {
            type: String,
            // Virtual property to concatenate firstName and lastName
            get: function() {
                return `${this.firstName} ${this.lastName}`;
            },
        },
        email: {
            type: String,
            required: [true, "Email address is required !!"],
            unique: true,
            set: function(value) {
                return value.toLowerCase();
            },
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Please enter a valid email address',
              ],
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: [true, "Please specify gender to continue.."],
        },
        userType: {
            type: String,
            enum: ["Student", "Teacher", "College Faculty", "Father", "Mother", "Other"],
            required: [true, "Please specify user type to continue.."],
        },
        password: {
            type: String,
            required: [true, "Password is required !!"],
            minlength: [8, "Minimum 8 characters required !"],
        },
        contact: {
            type: contactSchema,
            required: false, // Make contact data optional
        },
    },
    { timestamps: true }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export { User };
