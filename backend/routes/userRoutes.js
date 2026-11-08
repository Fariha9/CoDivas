import express from "express";
import {protect, adminOnly} from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getAllUsers } from "../controllers/userController.js"

const router = express.Router();

router.get(
  "/admin/users",
  protect,
  roleMiddleware("admin"),
  getAllUsers
);
// test protected route
router.get("/me", protect, (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;