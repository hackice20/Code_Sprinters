import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY ,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});

// CLOUD_NAME=
// CLOUD_API_KEY=
// CLOUD_API_SECRET=
// CLOUD_UPLOAD_PRESET=ml_default



export default cloudinary;