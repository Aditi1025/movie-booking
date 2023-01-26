import "./movie.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../components/hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { SearchContext } from "../../context/SearchContext";

const Movie = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error, reFetch } = useFetch(`/movies/find/${id}`);
  const [showId, setShowId] = useState("");
  const [showTime, setShowTime] = useState("");
  const fobj= useFetch(`/movies/theater/${id}`);
  // const { data, loading, error, reFetch } = useFetch(
  //   `/movies?city=${destination}&min=${min || 0 }&max=${max || 999}`
  //   );
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };
  
  const handleClick = (e,sid,stime) => {
    e.preventDefault();
    if (user) {
      setShowId(sid);
      setShowTime(stime);
      setOpenModal(true);
    } else {
      navigate("/");
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="movieContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="movieWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="movieTitle">{data.name}</h1>
            <div className="movieAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="movieDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="moviePriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="movieImages">
              {photos.map((photo, i) => (
                <div className="movieImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="movieImg"
                  />
                </div>
              ))}
            </div>
            <div className="movieDetails">
              <div className="movieDetailsTexts">
                <h1 className="movieTitle">{data.title}</h1>
                <p className="movieDesc">{data.desc}</p>
              </div>
              <div>
                {fobj.data.map((item) => (
                  <div key={item.theater._id}>
                    <p>{item.theater.name}</p>
                    <p>
                      {item.theater.country} {item.theater.city}{" "}
                      {item.theater.location}
                    </p>
                    {item.shows.map((show) => (
                      <div key={show._id}>
                        <button onClick={(e) => handleClick(e,show._id,show.time)}>
                          {show.time}
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} showId={showId} showTime={showTime} />}
    </div>
  );
};

export default Movie;
