import mongoose, { Document, Schema } from 'mongoose';

export interface IWifiLocation extends Document {
  placeName: string;
  address: string;
  city: string;
  type: string; // e.g., 'Cafe', 'Library', 'Station'
  wifiSpeed: string; // e.g., 'High', 'Medium', 'Low'
  timing: string;
  latitude: number;
  longitude: number;
}

const wifiLocationSchema: Schema = new Schema(
  {
    placeName: {
      type: String,
      required: [true, 'Please provide the place name'],
    },
    address: {
      type: String,
      required: [true, 'Please provide the complete address'],
    },
    city: {
      type: String,
      required: [true, 'Please provide the city'],
    },
    type: {
      type: String,
      required: [true, 'Please specify the location type (e.g., Cafe, Station)'],
    },
    wifiSpeed: {
      type: String,
      default: 'Unknown',
    },
    timing: {
      type: String,
      required: [true, 'Please provide operating timings'],
    },
    latitude: {
      type: Number,
      required: [true, 'Please provide latitude coordinate'],
    },
    longitude: {
      type: Number,
      required: [true, 'Please provide longitude coordinate'],
    },
  },
  {
    timestamps: true,
  }
);

const WifiLocation = mongoose.model<IWifiLocation>('WifiLocation', wifiLocationSchema);

export default WifiLocation;
