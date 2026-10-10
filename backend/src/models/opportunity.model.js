import mongoose, { Schema } from "mongoose";

const opportunitySchema = new Schema({
  ngo_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  required_skills: {
    type: [String],
    default: [],
  },
  duration: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  volunteersNeeded: {
    type: Number, default: 0
  },
  volunteersJoined: {
    type: Number, default: 0
  },
  acceptedVolunteers: [{
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  }],
  rejectedVolunteers: [{
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Opportunity', opportunitySchema);