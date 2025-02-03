import mongoose, {Schema} from "mongoose";
import { Product } from "./product.model.js";

const productSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [productSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true,
})


cartSchema.pre("save", async function(next) {
    //console.log("This is runnig from the cart schema.");
    try {
        let price = 0;
        
        for (let item of this.items) {
            const product = await Product.findById(item.productId);
            if(product) {
                price += product.price * item.quantity;
                //console.log(price);
            }
            else {
                console.error("Product not found.");
                return next();
            }  
        }
        this.totalPrice = price;
        next();
    } catch (error) {
        next(error);
    }
})

export const Cart = mongoose.model("Cart", cartSchema);