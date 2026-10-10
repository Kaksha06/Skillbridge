import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const applicationSchema = new Schema({
  opportunity_id: {
    type: Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true,
  },
  volunteer_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  name: {
    type: String
  },
  hoursCompleted: {
    type: Number, default: 0
  },
  appliedAt: {
    type: Date, default: Date.now
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true,
});

export default mongoose.model('Application', applicationSchema);