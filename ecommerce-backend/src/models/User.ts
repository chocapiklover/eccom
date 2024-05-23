import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderHistory: mongoose.Schema.Types.ObjectId[];
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Extend IUser to include _id as a string
export interface IUserWithId extends IUser {
  _id: string;
}

// Define the User schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    isAdmin: {
      type: Boolean,
      required: true, // isAdmin is required
      default: false, // Default value for isAdmin is false
    },
    address: {
      street: { type: String, required: true }, // Street is required
      city: { type: String, required: true }, // City is required
      state: { type: String, required: true }, // State is required
      postalCode: { type: String, required: true }, // Postal Code is required
      country: { type: String, required: true }, // Country is required
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to Order model
      },
    ],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Method to compare entered password with hashed password (for login)
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function (next) {
  // If the password is not modified, move to the next middleware
  if (!this.isModified('password')) {
    next();
  }
  // Generate salt for hashing
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Create the User model from the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
