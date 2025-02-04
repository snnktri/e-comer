import { Router } from "express";
import {protectedAdmin, adminLogin, logoutUser} from "../controllers/user.controller.js";
//import {upload} from "../middelwares/multer.middleare.js";
import { verifyJWT} from "../middelwares/auth.middelware.js"

const router = Router();


router.route("/adminLogin").post(adminLogin);

router.route("/protectedAdmin").get(verifyJWT, protectedAdmin);

router.route("/logout").get(verifyJWT, logoutUser);

export default router;