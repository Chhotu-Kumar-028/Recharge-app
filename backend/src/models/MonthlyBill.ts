import mongoose, { Document, Schema } from 'mongoose';

export interface IMonthlyBill extends Document {
  userId: mongoose.Types.ObjectId;
  totalExtraData: number;
  costPerGB: number;
  totalAmount: number;
  dueDate: Date;
  status: 'unpaid' | 'paid' | 'overdue';
}

const monthlyBillSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalExtraData: {
      type: Number,
      required: true,
      default: 0,
    },
    costPerGB: {
      type: Number,
      required: true,
      default: 15, // E.g., ₹15 per GB
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['unpaid', 'paid', 'overdue'],
      default: 'unpaid',
    },
  },
  {
    timestamps: true,
  }
);

const MonthlyBill = mongoose.model<IMonthlyBill>('MonthlyBill', monthlyBillSchema);

export default MonthlyBill;
