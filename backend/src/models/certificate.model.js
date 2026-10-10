import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: "Volunteer Excellence Certificate"
  },
  program: {
    type: String,
    required: true,
    default: "Teaching Program"
  },
  year: {
    type: String,
    required: true,
    default: "2025"
  },
  downloadUrl: {
    type: String,
    default: "/certificates/sample.pdf"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);