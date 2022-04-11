import express from "express";
import cors from "cors";

const router = express.Router();

router.use(cors({ origin: true }));

export default router;
