import React, { createContext, useState, useEffect } from "react";
import { api } from "../../Utils/axiosInstances";

export const adminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const authenticateAdmin = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                console.log("access Token:", token);
                if (!token) {
                    console.log("Admin not authenticated");
                    return;
                }
                 const response = await api.get("admin/protectedAdmin",
                                    {headers: {
                                        Authorization: `Bearer ${token}`,
                                    }}
                                );

                console.log("response"+response);

                if(response.data.suceess) {
                    setAdmin(response.data.data.user.username);
                }
                else {
                    setAdmin(null);
                    localStorage.removeItem("accessToken");
                    console.log("Admin is not authenticated");
                    return;
                }


            } catch (error) {
               setAdmin(null);
               localStorage.removeItem("accessToken");
                console.error("Error authenticating admin"+error.message);
                
            }
        }

        authenticateAdmin();
    }, [])

    const logout = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if(!token) {
                    console.log("Access denied!! plase log in first to access this features.");
                    return ;  // If no token, return without logging out.  // To prevent undefined errors when trying to access localStorage.removeItem()
                }
                console.log("Log out from auth context");
                console.log("Token: ", token);
                const response = await api.get("/admin/logout",{ headers: {
                    Authorization: `Bearer ${token}`,
                  }});
                //console.log(response);
                setAdmin(null);
                localStorage.removeItem("accessToken");
                setCarts({});
                //console.log("Logged Out Successfully!");
            } catch (error) { 
                console.error(error.message);   
            }
        }

    return (
        <adminAuthContext.Provider value={{ admin, logout, setAdmin }}>
            {children}
        </adminAuthContext.Provider>
    )
}