// import express from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js"; // Changed from authMiddleware to verifyJWT
// import {
//   createApplication,
//   applyToOpportunity,
//   getApplicationsForOpportunity,
//   getVolunteerApplications,
//   updateApplicationStatus
// } from "../controllers/application.controller.js";
// const router = express.Router();

// // Volunteer applies to an opportunity
// router.post("/", verifyJWT, joinOpportunity); // Changed here

// // NGO updates application status (accepted / rejected)
// router.put("/:id", verifyJWT, updateApplicationStatus); // Changed here
// router.post("/applications", auth, createApplication);
// router.post("/opportunities/:id/apply", auth, applyToOpportunity); // compatibility
// router.get("/applications/my", auth, getVolunteerApplications);
// router.get("/opportunities/:id/applications", auth, getApplicationsForOpportunity); // NGO
// router.patch("/applications/:id", auth, updateApplicationStatus);

// // Dashboard
// // router.get("/volunteer/dashboard", auth, getVolunteerDashboard)

// export default router;
import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createApplication,
  applyToOpportunity,
  getApplicationsForOpportunity,
  getVolunteerApplications,
  updateApplicationStatus
} from "../controllers/application.controller.js";

const router = express.Router();

// Volunteer applies to opportunity (main)
router.post("/", verifyJWT, createApplication);

// Compatibility: volunteer applies via /opportunities/:id/apply
router.post("/opportunities/:id/apply", verifyJWT, applyToOpportunity);

// Volunteer sees all his own applications
router.get("/my", verifyJWT, getVolunteerApplications);

// NGO fetches applications for a particular opportunity
router.get("/opportunities/:id", verifyJWT, getApplicationsForOpportunity);

// NGO accepts/rejects volunteer application
router.patch("/:id", verifyJWT, updateApplicationStatus);

export default router;
