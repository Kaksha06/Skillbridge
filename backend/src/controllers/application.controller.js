// import Application from "../models/application.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import Opportunity from "../models/opportunity.model.js"

// const joinOpportunity = asyncHandler(async (req, res) => {
//     try {
//         const volunteerId = req.user.id
//         const { opportunityId } = req.body

//         const appExists = Application.findOne({ opportunityId, volunteerId });

//         if (appExists)
//             return res.status(400).json({ message: "Already applied to this opportunity" });

//         const application = await Application.create({
//             opportunityId,
//             volunteerId,
//             status: "pending"
//         });
//         res.status(201).json({ message: "Application submitted", application });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
// const updateApplicationStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     const { id } = req.params; // applicationId
//     if (!["accepted", "rejected"].includes(status)) {
//         throw new ApiError(400, "Invalid Application status");
//     }
//     const updated = await Application.findByIdAndUpdate(
//         id,
//         { status },
//         { new: true }
//     );

//     if (!updated) {
//         throw new ApiError(404, "Application not found");
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, updated, "Status updated successfully"));
// })

// const getVolunteerApplications = asyncHandler(async (req, res) => {
//     const volunteerId = req.user.id;

//     const apps = await Application.find({ volunteerId }).populate("opportunityId");

//     return res
//         .status(200)
//         .json(new ApiResponse(200, apps, "Applications fetched"));

// })
// export {
//     joinOpportunity,
//     updateApplicationStatus,
//     getVolunteerApplications

// }
// application.controller.js
import Application from "../models/application.model.js";
import Opportunity from "../models/opportunity.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

/**
 * Create application (volunteer joins opportunity)
 * - endpoint: POST /applications   { opportunityId }
 * - compatibility: POST /opportunities/:id/apply will call this
 */
const createApplication = asyncHandler(async (req, res) => {
  const volunteerId = req.user?._id;
  const { opportunityId } = req.body;

  if (!opportunityId) throw new ApiError(400, "opportunityId is required");

  // ensure opportunity exists
  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) throw new ApiError(404, "Opportunity not found");

  // prevent duplicate application
  const appExists = await Application.findOne({ opportunityId, volunteerId });
  if (appExists) {
    throw new ApiError(400, "Already applied to this opportunity");
  }

  // create application
  const application = await Application.create({
    opportunityId,
    volunteerId,
    name: req.user?.fullName || req.user?.name || req.user?.email || '',
    status: "pending",
    appliedAt: new Date()
  });

  return res.status(201).json(new ApiResponse(201, application, "Application submitted"));
});

/**
 * Compatibility wrapper: POST /opportunities/:id/apply
 */
const applyToOpportunity = asyncHandler(async (req, res) => {
  const opportunityId = req.params.id;
  req.body = req.body || {};
  req.body.opportunityId = opportunityId;
  return createApplication(req, res);
});

/**
 * Get all applications for a specific opportunity (NGO owner or admin)
 * - endpoint: GET /opportunities/:id/applications
 */
const getApplicationsForOpportunity = asyncHandler(async (req, res) => {
  const opportunityId = req.params.id;
  const userId = req.user?._id;

  // verify opportunity exists
  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) throw new ApiError(404, "Opportunity not found");

  // verify caller is NGO owner or admin
  const isOwner = String(opportunity.ngo_id) === String(userId);
  const isAdmin = req.user?.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to view applications for this opportunity");
  }

  const apps = await Application.find({ opportunityId }).populate("volunteerId", "-password -refreshToken");
  return res.status(200).json(new ApiResponse(200, apps, "Applications fetched"));
});

/**
 * Get logged-in volunteer's applications
 * - endpoint: GET /applications/my
 */
const getVolunteerApplications = asyncHandler(async (req, res) => {
  const volunteerId = req.user?._id;
  const apps = await Application.find({ volunteerId }).populate({
    path: "opportunityId",
    select: "title organization description startDate endDate location volunteersNeeded volunteersJoined"
  });
  return res.status(200).json(new ApiResponse(200, apps, "Volunteer applications fetched"));
});

/**
 * Update application status (accept/reject)
 * - endpoint: PATCH /applications/:id
 * - permission: only NGO owner of the opportunity (or admin) can accept/reject
 * - side effects: updates Opportunity.acceptedVolunteers / rejectedVolunteers and volunteersJoined count
 */
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const applicationId = req.params.id;
  const { status } = req.body;
  const allowed = ["accepted", "rejected", "pending"];
  if (!allowed.includes(status)) throw new ApiError(400, "Invalid status");

  const application = await Application.findById(applicationId);
  if (!application) throw new ApiError(404, "Application not found");

  const opportunity = await Opportunity.findById(application.opportunityId);
  if (!opportunity) throw new ApiError(404, "Opportunity not found");

  // permission check
  const userId = req.user?._id;
  const isOwner = String(opportunity.ngo_id) === String(userId);
  const isAdmin = req.user?.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not authorized to modify this application");
  }

  // update application status
  application.status = status;
  application.reviewedAt = new Date();
  await application.save();

  // update opportunity counters/lists
  opportunity.acceptedVolunteers = opportunity.acceptedVolunteers || [];
  opportunity.rejectedVolunteers = opportunity.rejectedVolunteers || [];

  // remove volunteer from both lists before adding
  opportunity.acceptedVolunteers = opportunity.acceptedVolunteers.filter(id => String(id) !== String(application.volunteerId));
  opportunity.rejectedVolunteers = opportunity.rejectedVolunteers.filter(id => String(id) !== String(application.volunteerId));

  if (status === "accepted") {
    opportunity.acceptedVolunteers.push(application.volunteerId);
  } else if (status === "rejected") {
    opportunity.rejectedVolunteers.push(application.volunteerId);
  }

  opportunity.volunteersJoined = (opportunity.acceptedVolunteers || []).length;
  await opportunity.save();

  return res.status(200).json(new ApiResponse(200, application, "Application status updated"));
});

export {
  createApplication,
  applyToOpportunity,
  getApplicationsForOpportunity,
  getVolunteerApplications,
  updateApplicationStatus
};
