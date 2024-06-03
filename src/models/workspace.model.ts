import mongoose from "mongoose";

export interface IWorkspace extends mongoose.Document {
  name: string;
  description?: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  members: mongoose.Schema.Types.ObjectId[];
}

const workspaceSchema = new mongoose.Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Workspace =
  mongoose.models.Workspace ||
  mongoose.model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;
