import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/lectures/");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

// File filter to make sure only video formats are accepted
const videoFilter = (req, file, cb) => {
    const allowedExtensions = /mp4|mkv|mov|avi|wmv/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith("video/");

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Error: Only lecture video files are allowed!"));
    }
};

const videoUpload = multer({
    storage,
    fileFilter: videoFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB protection limit max
});

export default videoUpload;