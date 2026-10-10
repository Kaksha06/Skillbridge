import Opportunity from "../models/opportunity.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const matchOpportunities = asyncHandler(async (req, res) => {
  const user = req.user;
  const skills = user.skills || [];

  const matched = await Opportunity.find({
    required_skills: { $in: skills },
    status: "open"
  });

  return res
    .status(200)
    .json(new ApiResponse(200, matched, "Matched opportunities fetched"));
});

export { matchOpportunities };
