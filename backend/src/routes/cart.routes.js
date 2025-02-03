import { Router } from "express";
import {addToCart, updateCartQuantity, deleteCartItem, getAllCartItems, clearCart} from "../controllers/cart.controller.js"
import { verifyJWT } from "../middelwares/auth.middelware.js";

const router = Router();

router.route("/addToCart").post(verifyJWT, addToCart);
router.route("/updateQuantity").post(verifyJWT, updateCartQuantity);
router.route("/deleteCartItem/:productId").delete(verifyJWT, deleteCartItem);
router.route("/getCartsItems").get(verifyJWT, getAllCartItems);
router.route("/clearCart").delete(verifyJWT, clearCart);



export default router;