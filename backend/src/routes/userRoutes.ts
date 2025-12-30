import { Router } from "express";
import { authorize } from "../middleware/auth";
import {
  updateProfile,
  changePassword
} from "../controllers/userControllers";

const router = Router();


router.put("/profile", authorize, updateProfile);
router.put("/change-password", authorize, changePassword);

export default router;
