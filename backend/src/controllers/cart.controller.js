import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResnponse.js";
import { ApiError } from "../utils/ApiError.js";

// Function to add a product to the cart
const addToCart = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const userId = req.user._id;
    //console.log(items);

    // Validate the items array
    if (!items || items.length === 0) {
        throw new ApiError(400, "No items provided");
    }


    const { productId, quantity = 1 } = items[0];

    
    const userExist = await User.findById(userId);
    if (!userExist) {
        throw new ApiError(404, "User not found");
    }

    
    const productExist = await Product.findById(productId);
    if (!productExist) {
        throw new ApiError(404, "Product not found");
    }

   // console.log(productExist);

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
        
        const cart = await Cart.create({
            userId: userId,
            items: [{ productId: productId, quantity: quantity }] ,
            totalPrice: productExist.price
        })

       // return res.status(200).json(new ApiResponse(200, cart, "Cart created successfully"));
    }

   else { 
    const existProductId = cart.items.find(item => item.productId.toString() === productId.toString());
    

    if (!existProductId) {
        
        await Cart.findOneAndUpdate(
            { userId: userId },
            { $push: { items: { productId: productId, quantity: quantity } } },
            {totalPrice: productExist.totalPrice},
            { new: true }
        );
    } else {
        await Cart.findOneAndUpdate(
            { userId: userId, "items.productId": productId },
            { $inc: { "items.$.quantity": quantity,} }, 
            { new: true }
        );
    }
}

    
    const newCart = await Cart.findOne({ userId: userId }).populate({
        path: "items.productId",
        model: "Product"         
    });
    await newCart.save();

    return res.status(200).json(new ApiResponse(200, newCart, "Product added to cart successfully"));
});


//function to updateCart quantities to user cart
const updateCartQuantity = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const userId = req.user._id; 
    //console.log(userId);

    
    if (!items || items.length === 0) {
        throw new ApiError(400, "No items provided");
    }

    let updatedCart = [];

    
    for (const item of items) {
        const { productId, quantity } = item;


        if (!productId || quantity < 0) {
            throw new ApiError(400, "Invalid productId or quantity");
        }

        
        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            throw new ApiError(404, "Cart not found for this user");
        }

        const cartItem = await Cart.findOneAndUpdate(
            { userId: userId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true } 
        );

        //console.log(cartItem);

        if (!cartItem) {
            throw new ApiError(404, "Cart item not found");
        }

        updatedCart.push(cartItem);
    }

    const newCart = await Cart.findOne({ userId: userId }).populate({
        path: "items.productId",
        model: "Product"         
    });

    await newCart.save();

    return res.status(200).json(
        new ApiResponse(200, newCart, "Cart item quantity updated successfully.")
    );
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    console.log(req.params);
    const userId = req.user._id;

    console.log(userId);

    const cart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $pull: { items: { productId: productId } } },
        { new: true }
    );

    if (!cart) {
        throw new ApiError(404, "Cart not found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200, cart, "Cart item deleted successfully.")
    );
})

const getAllCartItems = asyncHandler(async (req, res) => {
   // console.log("I am running or not.");
    const userId = req.user._id; 
  //  console.log(userId);

    const cartItems = await Cart.find({ userId: userId }).
                            populate({
                                path: "items.productId",
                                model: "Product"
                            });

    // Check if cartItems is an empty array
    if (!cartItems || cartItems.length === 0) {
        throw new ApiError(404, "No cart items found for this user");
    }

    return res.status(200).json(
        new ApiResponse(200, cartItems, "All cart items are here...")
    );
})

const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const result = await Cart.deleteMany({ userId: userId });
    console.log(result);

    if (result.deletedCount === 0) {
        throw new ApiError(404, "No cart found for this user");
    }
    return res.status(200).json(
        new ApiResponse(200, null, "Cart cleared successfully.")
    );
})


export { addToCart, updateCartQuantity, deleteCartItem, getAllCartItems, clearCart };
