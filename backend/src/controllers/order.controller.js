import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import {} from "../models/category.model.js";
import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResnponse.js";
import { ApiError } from "../utils/ApiError.js";
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";
import axios from "axios";


const placeOrder = asyncHandler( async (req, res) => {

  const { address} = req.body;
  const customer = req.user._id;


  const customerExist = await User.findById(customer);

  if(!customerExist) { 
    throw new ApiError(404, "Customer not found");
  }

  const cart = await Cart.findOne({userId: customer});

  if(!cart) {
    throw new ApiError(404, "Cart not found");
  }

  console.log("Cart: ", cart);

  const orderPrice = cart.totalPrice;
  //console.log("OrderPrice: ", orderPrice);

 

  const transaction_uuid = uuidv4();

    //console.log("UUID:"+transaction_uuid);

    const parsedAmount = parseFloat(orderPrice);
    console.log("ParsedAmount: ", parsedAmount);
    const totalAmount = orderPrice + 100;



    const dataToHash = `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=${process.env.MERCHANT_ID}`;


    const secretId = process.env.SECRET;

    const signature = crypto.createHmac('sha256', secretId)
                         .update(dataToHash)
                         .digest('base64');

    console.log("Signature: ", signature);
    

    console.log("total amount: " + totalAmount);

    let paymentData = {
        amount: parsedAmount,
        failure_url: process.env.FAILURE_URL,
        product_code: process.env.MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
        product_delivery_charge: "100",
        product_service_charge: "0",
        tax_amount: "0",
        total_amount: totalAmount,
        transaction_uuid: transaction_uuid,
        signature: signature
      };

      console.log(paymentData)

      const paymentResponse = await axios.post(process.env.ESEWAPAYMENT_URL, null, {
        params: paymentData,
      });

      if (paymentResponse.status !== 200) {
          throw new ApiError(500, "Payment Gateway Error: Payment Failed");
      }

        const newOrder = await Order.create({
              customer,
              address: address,
              status: "PENDING"
       })

  //console.log("newOrder", newOrder);

  if(!newOrder) {
    throw new ApiError(500, "Order not created");
  }

  const createdOrder = await Order.findById(newOrder._id);

  if(!createdOrder) {
    throw new ApiError(500, "Order not created");
  }

  return res.status(200).
  json(
    new ApiResponse(200, {
      data: createdOrder,
      transaction_uuid,
      secret: process.env.SECRET,
      signature,
      url: process.env.SUCCESS_URL, 
    }, "Payment successfully complited.")
  )
})

const getAllOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  console.log(orders);
  if(!orders) {
    throw new ApiError(500, "No orders found");
  }
  return res.status(200).
  json(
    new ApiResponse(200, orders, "All order are here...")
  );
});

const getOrderById = asyncHandler(async (req, res) => {
  // Get the user ID from the authenticated user (assumes user is authenticated)
  const userId = req.user._id;

  console.log("I reach here.");
  console.log("User ID:", userId);


  const order = await Order.find({ customer: userId }).sort({updatedAt: -1});

//const createdOrder = await Order.findOne({ _id: newOrder._id }).sort({ updatedAt: -1 });
  console.log("Latest Order:", order);

  // If no order is found for the user, throw an error
  if (!order) {
    throw new ApiError(404, "No orders found for this user.");
  }

  // Return the latest order in the response
  return res.status(200).json(
    new ApiResponse(200, order, "Latest order fetched successfully.")
  );
});


export { placeOrder,
  getAllOrder,
getOrderById };

