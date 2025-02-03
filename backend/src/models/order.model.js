import mongoose, { Schema } from "mongoose";
import { Product } from "./product.model.js";
import { Cart } from "./cart.model.js";  // Importing Cart Schema

const orderItemsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({
    orderPrice: {
        type: Number,
        default: 0
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: {
        type: [orderItemsSchema]
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "DELIVERED", "CANCELLED"],
        default: "PENDING"
    },
}, { timestamps: true });

// Middleware to handle order creation with cart data
orderSchema.pre("save", async function(next) {
    try {
        const product = await Cart.findOne({
            userId: this.customer,
        })
       // console.log(product);
        if (!product) {
            throw new Error("Cart not found for the user.");
        }

        // now add a items details from the carts to the order
        this.orderItems = product.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));
        this.orderPrice = product.totalPrice;
        next();
    } catch (error) {
        next(error);
    }
});

export const Order = mongoose.model("Order", orderSchema);
