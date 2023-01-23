import mongoose from "mongoose";
const SeatSchema = new mongoose.Schema(
    {
        //seat name
        name: {
            type: String,
            required: true,
            unique: true,
        },
        //hall in theater
        hall: {
            type: String,
            required: true,
        },
        
        price: {
            type: Number,
            required: true
        },

        maxPeople: {
            type: String,
            required: true,
        },
        
        seatNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
},
{
    timestamps: true
});

export default mongoose.model("Seat", SeatSchema);