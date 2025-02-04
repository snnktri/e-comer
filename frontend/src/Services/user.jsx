import { api } from "../Utils/axiosInstances";



const registerUser = async (user) => {
    try {
        const response = await api.post("/users/register", user);
        return response.data;
    } catch (error) {
        console.error("Error registering", error);
        throw new Error("Error registering");
    }
}

const logInHost = async (data, setUser) => {
    
    try {
       // console.log("hereis:")
        const response = await api.post("/users/login", data);
        //console.log(response);
        //console.log(response.data.data);
        const {user, accessToken} = response.data.data;
    //     console.log(user.username);
    //     console.log(accessToken);
    //    console.log("username from login:", user.username)
        setUser(user.username)


        localStorage.setItem("accessToken", accessToken);
       // setUser(user);
        console.log("Logged In Successfully!");
        return { success: true, message: "Logged In Successfully!" };
    }
    catch (error) {
        console.error("Error during login:", error.message);
    return { success: false, message: error.message };
    }
}


const adminLogin = async(data, setAdmin) => {
    try {
        const response = await api.post("/admin/adminLogin", data);
        console.log(response);
        console.log(response.data.data);
        const {user, accessToken} = response.data.data;
        console.log(user.username);
        console.log(accessToken);
      
        setAdmin(user.username)

        localStorage.setItem("accessToken", accessToken);


        return { success: true, message:"Access token"};
    } catch (error) {
        console.error("Error logging in admin", error);
        throw new Error("Error logging in admin");
    }
}

export { registerUser, logInHost, adminLogin }