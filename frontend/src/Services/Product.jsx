import { api } from "../Utils/axiosInstances";

export const addP = async (addProduct) => {
    try {
         const formData = new FormData();
              Object.keys(addProduct).forEach((key) => {
                if (key === 'productImage') {
                  
                  formData.append(key, addProduct[key], addProduct[key].name); 
                } else {
                  
                  formData.append(key, addProduct[key]);
                }
            });
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            //  }
        const response = await api.post("/products/addProduct", formData);
        return response.data;
    } catch (error) {
        console.error("Error adding product", error);
        throw new Error("Error adding product");
    }
}

// const getAllProducts = async () => {
//     try {
//         const response = await api.get("/products/getAllProducts");
//         return response.data.data;
//     } catch (error) {
//         console.error("Error getting all products", error);
//         throw new Error("Error getting all products");
//     }
// }

export const addCatF = async (data) => {
  try {
        const response = await api.post("/categories/addCategory", data);
        return response.data;
    } catch (error) {
        console.error("Error adding category", error);
        throw new Error("Error adding category");
    }
}




