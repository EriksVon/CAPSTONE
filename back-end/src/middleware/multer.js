import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "process.env.CLOUDINARY_URL",
  },
});

const upload = multer({ storage: cloudinaryStorage });

export { upload };
