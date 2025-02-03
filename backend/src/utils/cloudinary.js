import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECTET
});

const uploadonCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return;

        // Upload to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("Image uploaded successfully");
        console.log(response.url);

        // Delete the local file after upload
        // fs.unlinkSync(localFilePath); // Uncomment this line if you want to delete the local file after upload
        fs.unlinkSync(localFilePath); // Ensure the file is deleted after upload
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); // Ensure the file is deleted on error
        console.error("Error uploading image: " + error.message);
        return null;
    }
};

export { uploadonCloudinary };
