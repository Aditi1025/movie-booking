import express from "express";
import {
  createSeat,
  deleteSeat,
  getSeat,
  getSeats,
  updateSeat,
  updateSeatAvailability,
} from "../controllers/seat.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:theaterid", verifyAdmin, createSeat);

//UPDATE
router.put("/availability/:id", updateSeatAvailability);
router.put("/:id", verifyAdmin, updateSeat);
//DELETE
router.delete("/:id/:theaterid", verifyAdmin, deleteSeat);
//GET

router.get("/:id", getSeat);
//GET ALL

router.get("/", getSeats);

export default router;