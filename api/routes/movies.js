import express from "express";

// changed Movie stuff with movies and similarly changed the attributes for it as per ER-diagram
import {
  countByCity,
  countByGenre,
  createMovie,
  deleteMovie,
  getMovie,
  getMovieRooms,
  getMovies,
  updateMovie,
} from "../controllers/movie.js";

import Movie from "../models/Movie.js";
import { createError } from "../utils/error.js";
 import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
// router.post("/", async (req,res) => {
    
//     const newMovie = new Movie(req.body)

//     try{
//         const savedMovie = await newMovie.save()
//         res.status(200).json(savedMovie)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

router.post("/", verifyAdmin, createMovie);

//UPDATE
router.put("/:id", async (req,res) => {
    
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, 
            { $set: req.body},
            {new: true}
            );
        res.status(200).json(updatedMovie)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id",verifyAdmin, updateMovie);
//DELETE
router.delete("/:id", verifyAdmin, deleteMovie);
//GET
router.get("/find/:id", getMovie);
//GET ALL
// router.get("/", async (req,res,next) => {
//     const failed = true;

//     if (failed)  return next(createError(401,"You are noth authenticated"));
//     try{
//         const Movies = await Movie.findById("ahsdkuhafse");
//         res.status(200).json(Movies)
//     }
//     catch(err){
//         next(err)
//     }
// })

router.get("/", getMovies);
router.get("/countByCity", countByCity);
router.get("/countByGenre", countByGenre);
// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getMovieRooms);

export default router;