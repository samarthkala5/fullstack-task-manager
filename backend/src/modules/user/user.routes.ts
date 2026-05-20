import express from "express";
import { protect } from "../../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/profile",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Protected route accessed",
      user: (req as any).user,
    });
  }
);

export default router;