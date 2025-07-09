import mongoose from "mongoose";

const ambulanceSchema = new mongoose.Schema({
  areaType: { type: String, required: true },
  areaName: { type: String, required: true },
  villageOrWard: { type: String, required: true },
  patientName: { type: String, required: true },
  ageGender: { type: String },
  healthIssue: { type: String },
  pickupFrom: { type: String },
  dropTo: { type: String },
  mobileNumber: { type: String },
  parentName: { type: String },
  parentMobile: { type: String },
  address: { type: String },
  staffAttended: { type: String },
  ambulanceName: { type: String },
  dateTime: { type: String },
});

export const Ambulance = mongoose.model("Ambulance", ambulanceSchema);
