import { Router } from "express";
import { registerUser, loginUser, logoutUser, protectedController } from "../controllers/user.controller.js";
import {upload} from "../middelwares/multer.middleare.js";
import { verifyJWT } from "../middelwares/auth.middelware.js"


const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secure router

router.route("/logout").get(verifyJWT, logoutUser);
router.route("/protected").get(verifyJWT, protectedController)


export default router;