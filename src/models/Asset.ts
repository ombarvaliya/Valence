import mongoose, { Schema, Document } from 'mongoose';

export interface IAsset extends Document {
  name: string;
  assetType: 'Renewable' | 'Hydrogen' | 'Demand';
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  capacity?: string;
  source?: 'Solar' | 'Wind' | 'Hydro';
  industry?: string;
  userId: mongoose.Schema.Types.ObjectId; 
}

const AssetSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Asset name is required.'],
    trim: true 
  },
  assetType: {
    type: String,
    required: [true, 'Asset type is required.'],
    enum: ['Renewable', 'Hydrogen', 'Demand'] 
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude] format
      required: true
    }
  },
  capacity: { type: String },
  source: { type: String, enum: ['Solar', 'Wind', 'Hydro'] },
  industry: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This tells Mongoose the ID belongs to a User
    required: true,
  }
}, {
  timestamps: true
});

AssetSchema.index({ location: '2dsphere' });

export default mongoose.models.Asset || mongoose.model<IAsset>('Asset', AssetSchema);