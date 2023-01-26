import "./newTheater.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { theaterInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewTheater = () => {
  const [info, setInfo] = useState({});
  const [movieId, setMovieId] = useState(undefined);
  const [theaters, setTheaters] = useState([]);

  const { data, loading, error } = useFetch("/movies");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const theaterNumbers = theaters.split(",").map((theater) => ({ number: theater }));
    try {
      await axios.post(`/theaters/${movieId}`, { ...info, theaterNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Theater</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {theaterInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Theaters</label>
                <textarea
                  onChange={(e) => setTheaters(e.target.value)}
                  placeholder="give comma between theater numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a movie</label>
                <select
                  id="movieId"
                  onChange={(e) => setMovieId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((movie) => (
                        <option key={movie._id} value={movie._id}>{movie.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTheater;