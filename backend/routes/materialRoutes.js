import express from "express";

import {
uploadMaterial,
getMaterials
} from "../controllers/materialController.js";


import {protect} from "../middleware/authMiddleware.js";

import materialUpload from "../middleware/uploadMiddleware.js";


const router = express.Router();



router.post(
"/upload",
protect,
materialUpload.single("file"),
uploadMaterial
);



router.get(
"/:courseId",
getMaterials
);



export default router;