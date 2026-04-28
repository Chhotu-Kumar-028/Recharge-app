import mongoose, { Document, Schema } from 'mongoose';

export interface IFundingCampaign extends Document {
  title: string;
  description: string;
  goalAmount: number;
  collectedAmount: number;
  peopleHelped: number;
  isActive: boolean;
}

const fundingCampaignSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide the campaign title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide the campaign description'],
    },
    goalAmount: {
      type: Number,
      required: [true, 'Please provide the goal amount'],
    },
    collectedAmount: {
      type: Number,
      default: 0,
    },
    peopleHelped: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FundingCampaign = mongoose.model<IFundingCampaign>('FundingCampaign', fundingCampaignSchema);

export default FundingCampaign;
