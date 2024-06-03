import { models, model, Schema } from "mongoose";

interface IPipelineStage extends Document {
  name: string;
  order: number;
  createdBy: Schema.Types.ObjectId;
}

const pipelineStageSchema = new Schema<IPipelineStage>({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    unique: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

pipelineStageSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Find the highest order number
    const lastStage = await PipelineStage.findOne().sort("-order");
    this.order = lastStage ? lastStage.order + 1 : 1;
  }
  next();
});

const PipelineStage =
  models.PipelineStage ||
  model<IPipelineStage>("PipelineStage", pipelineStageSchema);

export default PipelineStage;
