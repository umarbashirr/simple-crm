import { Document, Schema, model, models } from "mongoose";

export interface ILead extends Document {
  contactId: Schema.Types.ObjectId;
  stage: Schema.Types.ObjectId;
  title: string;
  value: number;
  notes?: string;
  source?: string;
  assignedTo?: Schema.Types.ObjectId;
  status: string;
  lastContactedAt?: Date;
}

const leadSchema = new Schema<ILead>(
  {
    contactId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Contact",
    },
    stage: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PipelineStage",
    },
    title: { type: String, required: true },
    value: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    source: {
      type: String,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed", "progress"],
    },
    lastContactedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = models.Lead || model<ILead>("Lead", leadSchema);

export default Lead;
