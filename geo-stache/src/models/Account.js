import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    location: {
      type: { type: String, enum: ['Point'], required: true, default: "Point" },
      coordinates: { type: [Number], required: true }
    }
    // NOTE If you wish to add additional properties do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
),

  AccountSchema.index({ location: '2dsphere' });


