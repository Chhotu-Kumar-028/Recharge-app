import mongoose, { Document, Schema } from 'mongoose';

export interface IDataWallet extends Document {
  userId: mongoose.Types.ObjectId;
  dailyData: number; // in GB/MB
  usedData: number;
  remainingData: number;
  carryForwardData: number; // Unused data carried forward to next day
  extraDataUsed: number; // Data used on top of daily allowance
  date: Date;
}

const dataWalletSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dailyData: {
      type: Number,
      required: true,
      default: 0,
    },
    usedData: {
      type: Number,
      required: true,
      default: 0,
    },
    remainingData: {
      type: Number,
      required: true,
      default: 0,
    },
    carryForwardData: {
      type: Number,
      default: 0,
    },
    extraDataUsed: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: create a unique compound index so there's only one record per user per day
// We might just use standard date tracking instead depending on logic, but this is a good practice.
// dataWalletSchema.index({ userId: 1, date: 1 }, { unique: true });

const DataWallet = mongoose.model<IDataWallet>('DataWallet', dataWalletSchema);

export default DataWallet;
