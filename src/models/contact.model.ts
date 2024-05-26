import mongoose from "mongoose";

interface IAddress {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  address?: IAddress;
  notes?: string;
  tags?: string[];
  createdBy?: any;
}

// Address schema with _id disabled
const addressSchema = new mongoose.Schema<IAddress>(
  {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipCode: { type: String },
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema<IContact>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    address: { type: addressSchema },
    notes: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
