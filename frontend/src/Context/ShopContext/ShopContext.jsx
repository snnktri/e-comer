import React, { createContext, useEffect, useState, useContext } from "react";
import { api } from "../../Utils/axiosInstances";
import { UserAuthContext } from "../AuthContext/userAuth.jsx"

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [products, setProducts] = useState([

    ]);
    const [carts, setCarts] = useState({
        items: [],
        totalPrice: 0,
        userId: null,
        cartId: null,
      });
      
  //  const [isAdding, setIsAdding] = useState(false);
    const [itemsNumber, setItemsNumber] = useState(0);
    const { user } = useContext(UserAuthContext);

    useEffect(() => {
        
        const getAllProducts = async () => {
            try {
                const response = await api.get("/products/getAllProducts");
                setProducts(response.data.data);
                //console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllProducts()
    }, []);

    //fetch all the cart data user specific if there any

    useEffect(() => {
       // console.log("Why i am running multiple times.");
        const fetchAllCartsData = async () => {
            if (user) {
                try {
                    const token = localStorage.getItem("accessToken");
                    console.log("token: ", token)
                    const cartData = await api.get("/carts/getCartsItems", {//carts/getCartsItems
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                  
                  const data = cartData.data.data[0];
            
                    if (cartData.data.success) {
                        setCarts({
                            items: data.items,
                            totalPrice: data.totalPrice,
                            userId: data.userId,
                            cartId: data._id
                        });
                       // console.log(cartData.data.message || "Cart data fetched successfully!");
                    } else {
                      //  console.log("Failed to fetch cart data.");
                        console.error("Error fetching cart data:", cartData.data.error);
                        setCarts({
                            items: [],
                            totalPrice: 0,
                            userId: null,
                            cartId: null
                        });
                    }
                } catch (error) {
                    console.log("Error fetching cart data.");
                    console.error("Failed to fetch cart data:", error.message);
                    setCarts(
                        {
                            items: [],
                            totalPrice: 0,
                            userId: null,
                            cartId: null
                        }
                    )
                }
            }
        };
        fetchAllCartsData();
    }, [user]);

    useEffect(() => {
     // console.log(carts.items);

     const items = carts.items || [];//const items = carts.items;
      const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
      setItemsNumber(prevItemsNumber => {
        if (prevItemsNumber !== totalQuantity) {
          return totalQuantity;  // Update if the quantity has changed
        }
        return prevItemsNumber;  // No change if the quantity is the same
      });
    }, [carts, user]);

    //remove from cart
    const removeFromCart = async (productId) => {

        try {
            console.log("productId:", productId);
            const response = await api.delete(`/carts/deleteCartItem/${productId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );//carts/deleteCartItem/
            
            if(response.data.success) {
                const data = response.data.data;
                //const index = data.items.indexOf(item => item.productId._id === productId);
                setCarts(prevCart => {
                
                   // const itemToRemove = prevCart.items.find(item => item.productId._id === productId);
                    
                
                    const updatedItems = prevCart.items.filter(item => item.productId._id !== productId);
                
            
                    const updatedTotalPrice = updatedItems.reduce((total, item) => 
                        total + item.productId.price * item.quantity, 0);
                
                    return {
                        ...prevCart,
                        items: updatedItems,
                        totalPrice: updatedTotalPrice
                    };
                });
                
            }

            return 
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    //add to cart
    const addToCart = async (id) => {
        if (!user) {
            console.log("User must be logged in to add items to the cart.");
            return;
        }
        try {
            const token = localStorage.getItem("accessToken");
            const response = await api.post("/carts/addToCart", {
                items: [{ productId: id }],
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const data = response.data.data;
            const product = products.find(product => product._id === id);
            if (response.data.success) {
                //const itemIndex = data.items.findIndex(item => item.productId._id === id);
    
                setCarts((prevCart) => {
                    // Create a copy of the items array
                    let updatedItems = prevCart?.items || [];
                    let updatedTotalPrice = prevCart?.totalPrice || 0;
                    const itemIndex = updatedItems.findIndex(
                        (item) => item.productId._id === product._id // Compare by _id directly
                      );

                      
                  
                    if (itemIndex === -1) {
                      // Item not in cart, so add it
                      updatedItems = [
                        ...updatedItems, 
                        {
                            productId: {
                                _id: product._id,
                                productImage: product.productImage,
                                price: product.price,
                                name: product.name,
                                category: product.category,
                                description: product.description,
                            },
                            quantity: 1,
                        }
                    ];
                      updatedTotalPrice += product.price;
                    } else {
                     
                      updatedItems = [
                        ...prevCart.items.slice(0, itemIndex), 
                        {
                            ...prevCart.items[itemIndex],
                            quantity: prevCart.items[itemIndex].quantity + 1, 
                        },
                        ...prevCart.items.slice(itemIndex + 1), 
                    ];
                      updatedTotalPrice += product.price;
                    }
                  
                    return {
                      items: updatedItems,
                      totalPrice: updatedTotalPrice,
                      userId: data.userId,
                      cartId: data._id,
                    };
                  });
                  
                
              
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const updateCart = async (id, newQuantity) => {
        try {
            const token = localStorage.getItem("accessToken");
    
            // Send the updated quantity to the backend
            const response = await api.post("/carts/updateQuantity", {
                items: [{ productId: id, quantity: newQuantity }],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.data.success) {
                const data = response.data.data;
                setCarts((prevCart) => {
                    let updatedItems = [...prevCart.items];
                    let updatedTotalPrice = data.totalPrice;
    
                    const indexOf = updatedItems.findIndex(item => item.productId._id === id);
    
                    
                    if (indexOf !== -1) {
                        const itemPrice = updatedItems[indexOf].productId.price;
                        
                       
                        updatedItems[indexOf] = {
                            ...updatedItems[indexOf],
                            quantity: parseInt(newQuantity),
                        };

                        console.log(updatedItems)
    
                        // Update total price based on the new quantity
                        updatedTotalPrice = updatedTotalPrice + (newQuantity - updatedItems[indexOf].quantity) * itemPrice;
                    }
    
                    return {
                        items: updatedItems,
                        totalPrice: updatedTotalPrice,
                        userId: data.userId,
                        cartId: data._id,
                    };
                });
    
                return { success: true, message: "Cart updated successfully!" };
            }
        } catch (error) {
            console.error("Error updating cart items: ", error);
            return { success: false, message: "Error updating cart!" };
        }
    }
    
    
    const clearCart = async() => {
        try {
            const response = await api.delete("/carts//clearCart", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            });

            if(response.data.success) {
                console.log("Cart cleared successfully!");
                setCarts({ items: [], totalPrice: 0, userId: null, cartId: null });
            }

        } catch (error) {
            
        }
    }
    const contextEvents = { products,
        addToCart,
        removeFromCart,
        updateCart,
        carts,
        itemsNumber,
    clearCart}

    
    return (
        <ShopContext.Provider value={contextEvents}>
            {children}
        </ShopContext.Provider>
    );
};