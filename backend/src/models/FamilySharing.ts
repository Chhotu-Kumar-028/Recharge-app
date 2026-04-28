import mongoose, { Document, Schema } from 'mongoose';

export interface IFamilySharing extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverMobile: string;
  relation: string;
  dataAmount: number; // Amount in GB or MB
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
}

const familySharingSchema: Schema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverMobile: {
      type: String,
      required: [true, 'Please provide the receiver mobile number'],
    },
    relation: {
      type: String,
      required: [true, 'Please provide the relation (e.g., Brother, Wife, Friend)'],
    },
    dataAmount: {
      type: Number,
      required: [true, 'Please provide the data amount to share'],
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'success',
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

const FamilySharing = mongoose.model<IFamilySharing>(
  'FamilySharing',
  familySharingSchema
);

export default FamilySharing;
