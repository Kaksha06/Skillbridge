// import express from "express";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
// import { getVolunteerStats, getNGOStats } from "../controllers/dashboard.controller.js";

// const router = express.Router();

// router.get("/volunteer", authMiddleware, getVolunteerStats);
// router.get("/ngo", authMiddleware, getNGOStats);

// export default router;
import express from "express";
import { 
  getVolunteerDashboard,
  getVolunteerStats, 
  getNGOStats,
  deleteCertificate 
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Volunteer dashboard routes
router.get("/volunteer/dashboard", verifyJWT, getVolunteerDashboard);
router.get("/volunteer/stats", verifyJWT, getVolunteerStats);
router.delete("/volunteer/certificates/:certificateId", verifyJWT, deleteCertificate);

// NGO dashboard routes
router.get("/ngo/stats", verifyJWT, getNGOStats);

export default router;