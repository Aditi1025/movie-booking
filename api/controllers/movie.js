import Movie from "../models/Movie.js";
import Theater from "../models/Theater.js";

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
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

export const getMovies = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const movies = await Movie.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(movies);
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

export const countByGenre = async (req, res, next) => {
  try {
    const comedyCount = await Movie.countDocuments({ genre: "Comedy" });
    const fantasyCount = await Movie.countDocuments({ genre: "Fantasy" });
    const romanticCount = await Movie.countDocuments({ genre: "Romantic" });
    const thrillerCount = await Movie.countDocuments({ genre: "Thriller" });
    const scifiCount = await Movie.countDocuments({ genre: "Scifi" });

    res.status(200).json([
      { genre: "Comedy", count: comedyCount },
      { genre: "Fantasy", count: fantasyCount },
      { genre: "Romantic", count: romanticCount },
      { genre: "Thriller", count: thrillerCount },
      { genre: "Scifi", count: scifiCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getMovieTheater = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const list = await Promise.all(
      movie.theaters.map((theater) => {
        return Theater.findById(theater);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};