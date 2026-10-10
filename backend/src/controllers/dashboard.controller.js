// import Application from "../models/application.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// const getVolunteerStats = asyncHandler(async (req, res) => {
//   const volunteerId = req.user.id;
  
//   const totalApplied = await Application.countDocuments({ volunteerId });
//   const accepted = await Application.countDocuments({ volunteerId, status: "accepted" });

//   return res.status(200)
//     .json(new ApiResponse(200, {
//       totalApplied,
//       accepted,
//       pending: totalApplied - accepted
//     }, "Volunteer stats fetched"));
// });

// const getNGOStats = asyncHandler(async (req, res) => {
//   const ngoId = req.user.id;

//   const apps = await Application.find().populate("opportunityId");
//   const filtered = apps.filter(a => String(a.opportunityId?.ngo_id) === ngoId);

//   const totalReceived = filtered.length;
//   const accepted = filtered.filter(a => a.status === "accepted").length;

//   return res.status(200)
//     .json(new ApiResponse(200, {
//       totalReceived,
//       accepted,
//       pending: totalReceived - accepted
//     }, "NGO stats fetched"));
// });

// export { getVolunteerStats, getNGOStats };
import Application from "../models/application.model.js";
import { Certificate } from "../models/certificate.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVolunteerDashboard = asyncHandler(async (req, res) => {
  const volunteerId = req.user._id;
  
  // 1. Get all accepted opportunities for this volunteer
  const myOpportunities = await Application.find({
    volunteerId,
    status: "accepted"
  }).populate({
    path: 'opportunityId',
    select: 'title organization description startDate endDate location'
  });

  // Format opportunities for frontend
  const formattedOpportunities = myOpportunities.map(app => ({
    _id: app._id,
    title: app.opportunity_id?.title || "Opportunity",
    organization: app.opportunity_id?.organization || "Organization",
    status: "active", // You can make this dynamic
    hoursCompleted: app.hoursCompleted || 0,
    totalHours: app.opportunity_id?.totalHours || 10,
    nextSession: app.opportunity_id?.startDate || new Date(),
    applicationStatus: app.status,
    opportunityId: app.opportunity_id
  }));

  // 2. Get active certificates for this volunteer
  const myCertificates = await Certificate.find({
    volunteerId,
    isActive: true
  });

  // 3. Calculate stats
  const totalOpportunities = formattedOpportunities.length;
  const totalCertificates = myCertificates.length;
  
  // Calculate total hours from completed opportunities
  const totalHours = formattedOpportunities.reduce((sum, opp) => {
    return sum + (opp.hoursCompleted || 0);
  }, 0);
  
  // Calculate impact score (customize as needed)
  const impactScore = totalHours * 10 + totalCertificates * 50;

  return res.status(200).json(
    new ApiResponse(200, {
      stats: {
        totalOpportunities,
        totalCertificates,
        totalHours,
        impactScore
      },
      myOpportunities: formattedOpportunities,
      myCertificates
    }, "Volunteer dashboard data fetched successfully")
  );
});

// Keep the old getVolunteerStats for backward compatibility if needed
const getVolunteerStats = asyncHandler(async (req, res) => {
  const volunteerId = req.user._id;
  
  const totalApplied = await Application.countDocuments({ volunteerId });
  const accepted = await Application.countDocuments({ volunteerId, status: "accepted" });

  return res.status(200)
    .json(new ApiResponse(200, {
      totalApplied,
      accepted,
      pending: totalApplied - accepted
    }, "Volunteer stats fetched"));
});

const getNGOStats = asyncHandler(async (req, res) => {
  const ngoId = req.user._id;

  const apps = await Application.find().populate("opportunityId");
  const filtered = apps.filter(a => String(a.opportunity_id?.ngo_id) === ngoId);

  const totalReceived = filtered.length;
  const accepted = filtered.filter(a => a.status === "accepted").length;

  return res.status(200)
    .json(new ApiResponse(200, {
      totalReceived,
      accepted,
      pending: totalReceived - accepted
    }, "NGO stats fetched"));
});

// Add certificate delete function
const deleteCertificate = asyncHandler(async (req, res) => {
  const { certificateId } = req.params;
  const volunteerId = req.user._id;
  
  const certificate = await Certificate.findOne({
    _id: certificateId,
    volunteerId
  });
  
  if (!certificate) {
    return res.status(404).json(
      new ApiResponse(404, null, "Certificate not found")
    );
  }
  
  // Soft delete by marking as inactive
  certificate.isActive = false;
  await certificate.save();
  
  return res.status(200).json(
    new ApiResponse(200, null, "Certificate deleted successfully")
  );
});

export { 
  getVolunteerDashboard,
  getVolunteerStats, 
  getNGOStats,
  deleteCertificate 
};