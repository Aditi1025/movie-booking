import mongoose from "mongoose";
const ShowSchema = new mongoose.Schema(
  {
    //seat name
    time: {
      type: String,
      required: true,
    },
    //hall in theater
    hall:{
        type: String,
        required:true,
     },
    date: {
        type: String,
        required: true,
    },
    seats:[String]
  },
);

export default mongoose.model("Show", ShowSchema);
