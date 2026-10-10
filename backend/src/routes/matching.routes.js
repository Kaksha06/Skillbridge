import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { matchOpportunities } from "../controllers/matching.controller.js";

const router = express.Router();

router.get("/", verifyJWT, matchOpportunities);

export default router;
