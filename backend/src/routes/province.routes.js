import express from "express";
import {
  createProvince,
  removeProvince,
} from "../controllers/province.controller.js";

const router = express.Router();

router.post("/create", createProvince);
router.delete("/remove", removeProvince);

export default router;
