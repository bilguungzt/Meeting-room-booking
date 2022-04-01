import express from "express";
import { getroomss, createrooms, deleterooms, updaterooms } from "../controllers/rooms.js";
import rooms from "./../models/rooms.js";
const router = express.Router();

router.get("/", getroomss);
router.post("/", createrooms);
router.delete("/:id", deleterooms);
router.patch("/:id", updaterooms);

export default router;
