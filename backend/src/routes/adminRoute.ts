import { Router } from "express";
import { authorize } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import {
  allStudents,
  activateStudent,
  deactivateStudent
} from "../controllers/adminControllers";

const router = Router();

router.get(
  "/students",
  authorize,
  requireRole("ADMIN"),
  allStudents
);

router.patch(
  "/students/:id/activate",
  authorize,
  requireRole("ADMIN"),
  activateStudent
);

router.patch(
  "/students/:id/deactivate",
  authorize,
  requireRole("ADMIN"),
  deactivateStudent
);

export default router;
