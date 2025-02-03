import { api } from "../Utils/axiosInstances";

export const placeOrder = async (address) => {
   try {
    console.log("I reach here.");
    const response = await api.post(
        "/orders/placeOrder", 
        { address },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

 console.log(response);

 if(response.data.success) {
    // console.log("Order placed successfully!");
     return response.data;
 }
   } catch (error) {
    console.log("Placed order error from service: ", error.message);
   }
}
