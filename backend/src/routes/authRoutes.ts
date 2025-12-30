import { Router } from "express";
import { registerUsers,getUser } from "../controllers/userAuthControllers";
import { authorize } from "../middleware/auth";
const router = Router();

router.post("/register",registerUsers);
router.post("/login",getUser);  


export default router;    
