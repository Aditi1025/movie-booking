import express from "express";
import {
  createTheater,
  deleteTheater,
  getTheater,
  getTheaters,
  updateTheater,
} from "../controllers/theater.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:movieid", verifyAdmin, createTheater);

//UPDATE
// router.put("/availability/:id", updateTheaterAvailability);
router.put("/:id", verifyAdmin, updateTheater);
//DELETE
router.delete("/:id/:movieid", verifyAdmin, deleteTheater);
//GET

router.get("/:id", getTheater);
//GET ALL

router.get("/", getTheaters);

export default router;