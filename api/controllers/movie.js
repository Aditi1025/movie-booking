import Movie from "../models/Movie.js";
// import Room from "../models/Room.js";

export const createMovie = async (req, res, next) => {
  const newMovie = new Movie(req.body);

  try {
    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (err) {
    next(err);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (err) {
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getMovie = async (req, res, next) => {
  try {
    const Movie = await Movie.findById(req.params.id);
    res.status(200).json(Movie);
  } catch (err) {
    next(err);
  }
};

export const getMovies = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const Movies = await Movie.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(Movies);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Movie.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const MovieCount = await Movie.countDocuments({ type: "Movie" });
    const apartmentCount = await Movie.countDocuments({ type: "apartment" });
    const resortCount = await Movie.countDocuments({ type: "resort" });
    const villaCount = await Movie.countDocuments({ type: "villa" });
    const cabinCount = await Movie.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Movie", count: MovieCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getMovieRooms = async (req, res, next) => {
  try {
    const Movie = await Movie.findById(req.params.id);
    const list = await Promise.all(
      Movie.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};