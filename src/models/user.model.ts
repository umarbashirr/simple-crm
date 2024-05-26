import mongoose from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verificationStatus: boolean;
  emailVerificationToken?: string;
  emailVerificationTokenExpiry?: string;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationStatus: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiry: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
