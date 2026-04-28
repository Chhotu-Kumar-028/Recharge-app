import mongoose, { Document, Schema } from 'mongoose';

export interface IEmergencyRecharge extends Document {
  userId: mongoose.Types.ObjectId;
  network: 'Jio' | 'Airtel' | 'Vi' | 'BSNL';
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'repaid';
  createdAt: Date;
}

const emergencyRechargeSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    network: {
      type: String,
      required: true,
      enum: ['Jio', 'Airtel', 'Vi', 'BSNL'],
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'repaid'],
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const EmergencyRecharge = mongoose.model<IEmergencyRecharge>(
  'EmergencyRecharge',
  emergencyRechargeSchema
);

export default EmergencyRecharge;
