import { Router } from "express";
import {
    profile,
    signin,
    signup,
    testing
} from "../controller/auth.controller";
import { TokenValidation } from "../lib/verify_token";

const router: Router = Router();

 
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", TokenValidation, profile);
router.get("/testing", TokenValidation, testing);

export default router;
