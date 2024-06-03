import mongoose from "mongoose";

interface Task extends mongoose.Document {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  assignedTo?: string;
  createdBy: string;
  contactId?: mongoose.Schema.Types.ObjectId;
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    required: true,
  },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  dueDate: { type: Date, required: true },
  assignedTo: { type: String },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  createdBy: { type: String, required: true },
});

const Task = mongoose.models.Task || mongoose.model<Task>("Task", taskSchema);

export default Task;
