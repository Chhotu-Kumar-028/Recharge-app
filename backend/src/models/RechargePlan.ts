import mongoose, { Document, Schema } from 'mongoose';

export interface IRechargePlan extends Document {
  network: 'Jio' | 'Airtel' | 'Vi' | 'BSNL';
  price: number;
  validity: number; // in days
  dataPerDay: number; // in GB typically
  unlimitedCalls: boolean;
  smsIncluded: number; // typically 100/day
  category: string;
  description: string;
}

const rechargePlanSchema: Schema = new Schema(
  {
    network: {
      type: String,
      required: [true, 'Please provide the network operator'],
      enum: ['Jio', 'Airtel', 'Vi', 'BSNL'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the plan price'],
    },
    validity: {
      type: Number,
      required: [true, 'Please provide the plan validity in days'],
    },
    dataPerDay: {
      type: Number,
      required: [false, 'Please provide data per day (if applicable)'],
      default: 0,
    },
    unlimitedCalls: {
      type: Boolean,
      default: false,
    },
    smsIncluded: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please provide the plan category (e.g., Popular, Data, Validity)'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description of the plan'],
    },
  },
  {
    timestamps: true,
  }
);

const RechargePlan = mongoose.model<IRechargePlan>('RechargePlan', rechargePlanSchema);

export default RechargePlan;
