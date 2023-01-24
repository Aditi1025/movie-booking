import express from "express";
import { createShow, deleteShow, getShow, getShows, updateShow } from "../controllers/show.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//CREATE
router.post("/:theaterid", verifyAdmin, createShow);

//UPDATE
router.put("/:id", verifyAdmin, updateShow);
//DELETE
router.delete("/:id/:theaterid", verifyAdmin, deleteShow);
//GET

router.get("/:id", getShow);
//GET ALL

router.get("/", getShows);
export default router;