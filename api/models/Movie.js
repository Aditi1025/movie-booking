import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  releaseDate:{
   type: String,
   required: true, 
  },
  cast: {
    type: [String],
    required:true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  theaters: {
    type: [String]
  }
});

export default mongoose.model("Movie", MovieSchema)