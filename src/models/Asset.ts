import mongoose, { Schema, Document } from 'mongoose';

// Interface for GeoJSON Point for geospatial queries
interface IPoint extends Document {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

// Interface describing the properties of an Asset
export interface IAsset extends Document {
  name: string;
  assetType: 'Renewable' | 'Hydrogen' | 'Demand';
  location: IPoint;
  capacity?: string; // e.g., "50MW"
  source?: 'Solar' | 'Wind' | 'Hydro'; // For 'Renewable' type
  industry?: string; // For 'Demand' type
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
  capacity: { 
    type: String 
  },
  source: { 
    type: String,
    enum: ['Solar', 'Wind', 'Hydro']
  },
  industry: { 
    type: String 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create a 2dsphere index for location to enable geospatial queries
AssetSchema.index({ location: '2dsphere' });

// Prevent model overwrite in Next.js hot-reloading environment
export default mongoose.models.Asset || mongoose.model<IAsset>('Asset', AssetSchema);
