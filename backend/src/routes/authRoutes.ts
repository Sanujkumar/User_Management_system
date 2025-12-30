import { Router } from "express";
import { registerUsers,getUser, getMe } from "../controllers/userAuthControllers";
import { authorize } from "../middleware/auth";
const router = Router();

router.post("/register",registerUsers);
router.post("/login",getUser);  
router.get("/me", authorize, getMe);

export default router;    
