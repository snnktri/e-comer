import {Router} from "express";
import { placeOrder, getAllOrder, getOrderById } from "../controllers/order.controller.js";
import { verifyJWT } from "../middelwares/auth.middelware.js";
//import { get } from "http";

const router = Router();

router.route("/placeOrder").post(verifyJWT, placeOrder);
router.route("/getAllOrder").get(getAllOrder);
router.route("/getOrderById").get(verifyJWT, getOrderById);

export default router;
