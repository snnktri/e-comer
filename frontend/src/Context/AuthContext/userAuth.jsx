import React, { createContext, useState, useEffect } from "react";
import { api } from "../../Utils/axiosInstances";


export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const localhost = async () => {
           // console.log("Runnig from authcontext");
            try {
                const token = localStorage.getItem("accessToken");
             //   console.log("access Token:", token);

                if(!token) {
                    console.log("Access denied!! plase log in first to access this features.");
                    return ;
                }
                const response = await api.get("users/protected",
                    {headers: {
                        Authorization: `Bearer ${token}`,
                    }}
                );
               // console.log("response:", response.data);
              // console.log("Response get finally");
                if(!response.data.success) {
                    setUser(null)
                    
                    localStorage.removeItem("accessToken");
                    return ;
                }
              //  console.log("I want to reac here")
               // console.log("User: ", response.data.data.user.username);
                setUser(response.data.data.user.username);
            } catch (error) {
                console.error("Access denied!! plase log in first to access this features");
                setUser(null);
            }
        }
        localhost();
    }, []);


    const logOutHost = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if(!token) {
                console.log("Access denied!! plase log in first to access this features.");
                return ;  // If no token, return without logging out.  // To prevent undefined errors when trying to access localStorage.removeItem()
            }
            //console.log("Log out from auth context");
            const response = await api.get("/users/logout",{ headers: {
                Authorization: `Bearer ${token}`, // Add token to the request headers
              }});
            //console.log(response);
            setUser(null);
            localStorage.removeItem("accessToken");
            setCarts({});
            //console.log("Logged Out Successfully!");
        } catch (error) { 
            console.error(error.message);   
        }
    }


    return (
        <UserAuthContext.Provider value={{ user, setUser, logOutHost }}>
            {children}
        </UserAuthContext.Provider>
    )
}