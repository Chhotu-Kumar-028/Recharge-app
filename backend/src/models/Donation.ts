import mongoose, { Document, Schema } from 'mongoose';

export interface IDonation extends Document {
  donorId: mongoose.Types.ObjectId;
  campaignName: string;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  donatedAt: Date;
}

const donationSchema: Schema = new Schema(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    campaignName: {
      type: String,
      required: [true, 'Please provide the campaign name'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide the donation amount'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    donatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model<IDonation>('Donation', donationSchema);

export default Donation;
