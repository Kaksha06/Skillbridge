import { Router } from "express";
import {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getAllOpportunities,
  getOpportunityById
} from "../controllers/opportunity.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createOpportunity);//ngo only
router.route("/").get(getAllOpportunities);//public route
router.route("/update/:id").put(verifyJWT, updateOpportunity);//ngo only
router.route("/delete/:id").delete(verifyJWT, deleteOpportunity);//ngo only
router.get("/opportunities/:id", getOpportunityById);

export default router;
