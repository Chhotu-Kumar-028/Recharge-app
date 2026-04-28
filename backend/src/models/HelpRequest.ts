import mongoose, { Document, Schema } from 'mongoose';

export interface IHelpRequest extends Document {
  userId: mongoose.Types.ObjectId;
  amountNeeded: number;
  reason: string;
  occupation: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
}

const helpRequestSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amountNeeded: {
      type: Number,
      required: [true, 'Please specify the amount needed'],
    },
    reason: {
      type: String,
      required: [true, 'Please provide a reason for the request'],
    },
    occupation: {
      type: String,
      required: [true, 'Please provide your current occupation'],
    },
    city: {
      type: String,
      required: [true, 'Please specify your city'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const HelpRequest = mongoose.model<IHelpRequest>('HelpRequest', helpRequestSchema);

export default HelpRequest;
