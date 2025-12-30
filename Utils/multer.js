
import { v2 as cloudinary } from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dblushk1x",
  api_key: "737331564889692",
  api_secret: "5Zw2xWTbkbyB2E8JQx_x1tFOzn8",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "test-23-dec",
    format: async (req, file) => {
      // auto-detect format (jpeg, png, webp, etc.)
      return file.mimetype.split("/")[1];
    },
    public_id: (req, file) => {
      const uniqueName = Date.now() + "-" + file.originalname;
      return uniqueName;
    },
  },
});
export const upload = multer({  storage });
