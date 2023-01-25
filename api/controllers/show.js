import Seat from "../models/Seat.js";
import Show from "../models/Show.js";
import Theater from "../models/Theater.js";

export const createShow = async (req, res, next) => {
  const theaterId = req.params.theaterid;
  const newShow = new Show(req.body);

  try {
    const savedShow = await newShow.save();
    try {
      await Theater.findByIdAndUpdate(theaterId, {
        $push: { shows: savedShow._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedShow);
  } catch (err) {
    next(err);
  }
};

export const updateShow = async (req, res, next) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedShow);
  } catch (err) {
    next(err);
  }
};
export const deleteShow = async (req, res, next) => {
  const theaterId = req.params.theaterid;
  try {
    await Show.findByIdAndDelete(req.params.id);
    try {
      await Theater.findByIdAndUpdate(theaterId, {
        $pull: { shows: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Show has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getShow = async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.id);
    res.status(200).json(show);
  } catch (err) {
    next(err);
  }
};
export const getShows = async (req, res, next) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (err) {
    next(err);
  }
};
export const getSeats = async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.showid);
    const list = await Promise.all(
      show.seats.map((seat) => {
        return Seat.findById(seat);
      })
    )
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}