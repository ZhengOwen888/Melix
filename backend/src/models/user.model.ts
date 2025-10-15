import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[a-zA-Z0-9_]{5,20}$/, "Invalid Username"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 12,
      maxlength: 20,
    },
    profileImageSize: {
      type: Number,
      max: 1024 * 1024, // 1MB
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
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
    verificationExpiresAt: {
      type: Date,
      default: new Date(Date.now() + 3600 * 1000), // 1 hour
    },
    forgotPasswordToken: String,
    forgotPasswordExpiresAt: Date,
  },
  { timestamps: true }
);

// Speed up query searching for user with indexing
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// Time-To-Live(TTL) indexes - Delete Data if user not verified
// !!! NOTE TO SELF !!!
// Dont forget to set the Verification expiration date to undefined after
// user verifies, otherwise verified user will get deleted.
// ANOTHER OPTION - add clean up function to delete unverified users
userSchema.index({ verificationExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);
