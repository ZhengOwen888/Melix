import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 12,
      maxlength: 20,
    },
    profileImage: String,
    bio: {
      type: String,
      maxlength: 50,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // optional fields, added when defined
    verificationToken: String,
    verificationExpiresAt: Date,
    forgotPasswordToken: String,
    forgotPasswordExpiresAt: Date,
  },
  { timestamps: true }
);

userSchema.index({ username: 1, email: 1 });

export const User = mongoose.model("User", userSchema);
