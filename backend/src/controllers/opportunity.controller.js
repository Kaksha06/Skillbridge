import Opportunity from "../models/opportunity.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOpportunity = asyncHandler(async (req, res) => {
  const { title, description, required_skills, duration, location, status } = req.body;

  // Validate required fields
  if (!title || !description || !duration) {
    throw new ApiError(400, "Title, description, and duration are required");
  }

  // Create new opportunity (ngo_id comes from req.user)
  // const newOpportunity = await Opportunity.create({
  //   title,
  //   description,
  //   required_skills,
  //   duration,
  //   location,
  //   status,
  //   ngo_id: req.user._id, 
  // });
const newOpportunity = await Opportunity.create({
    title,
    description,
    required_skills,
    duration,
    location,
    status: status || "open",
    ngo_id: req.user?._id,
    applicationsCount: 0,
    acceptedVolunteers: [],
    rejectedVolunteers: [],
    volunteersJoined: 0,
    volunteersNeeded: volunteersNeeded || 0
  });
  return res
    .status(201)
    .json(new ApiResponse(201, newOpportunity, "Opportunity created successfully"));
});

const updateOpportunity = asyncHandler(async (req, res) => {
  const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updated) {
    throw new ApiError(404, "Opportunity not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Opportunity updated successfully"));
});

const deleteOpportunity = asyncHandler(async (req, res) => {
  const deleted = await Opportunity.findByIdAndDelete(req.params.id);
  if (!deleted) {
    throw new ApiError(404, "Opportunity not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Opportunity deleted successfully"));
});


const getAllOpportunities = asyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find().populate("ngo_id", "fullName email");
  return res
    .status(200)
    .json(new ApiResponse(200, opportunities, "All opportunities fetched successfully"));
});

const getOpportunityById = asyncHandler(async (req, res) => {
  const opp = await Opportunity.findById(req.params.id).populate("ngo_id", "fullName email");
  if (!opp) throw new ApiError(404, "Opportunity not found");
  return res.status(200).json(new ApiResponse(200, opp, "Opportunity fetched"));
});
export {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getAllOpportunities,
  getOpportunityById
};

// const createOpportunity = asyncHandler(async(req,res)=>{
//     const{title, description, ngo_id, required_skills, duration, location, status} = req.body;
    
//     const newOpportunity = await Opportunity.create({
//         title, description, ngo_id, required_skills, duration, location, status,
//         createdBy: req.user._id
//     });
//     res.status(201).json(newOpportunity);
// });

// const updateOpportunity = async (req, res) => {
//   const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// };

// const deleteOpportunity = async (req, res) => {
//   await Opportunity.findByIdAndDelete(req.params.id);
//   res.json({ message: "Opportunity deleted successfully" });
// };

// const getAllOpportunities = async (req, res) => {
//   const opportunities = await Opportunity.find().populate("createdBy", "name email");
//   res.json(opportunities);
// };
// export{
//     createOpportunity,
//     updateOpportunity,
//     deleteOpportunity,
//     getAllOpportunities
// }