import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState,useContext } from "react";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = ({ setOpen, showId,showTime}) => {
    const { data, loading, error } = useFetch(`/shows/seats/${showId}`);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [berror, setBerror] = useState("");
    const searchContext = useContext(SearchContext);
    const dates = (searchContext.dates === undefined||searchContext.dates.length===0) ? [new Date()] : [new Date(searchContext.dates[0].startDate)];
    const stime = showTime.split(":");
    dates[0].setHours(stime[0],stime[1],"0","0");
    const isAvailable = (seatNumber) => {
      const isFound = seatNumber.unavailableDates.includes(dates[0].getTime());
      return isFound;
    }
    const handleSelect = (e) => {
       const checked = e.target.checked;
       const value = e.target.value;
       setSelectedSeats(
         checked
           ? [...selectedSeats, value]
           : selectedSeats.filter((item) => item !== value)
       );
    };
  const navigate = useNavigate();
    const handleClick = async(e) => {
      e.preventDefault();
      try {
        await Promise.all(
          selectedSeats.map(async (selectedSeat) => {
            const res = await axios.put(`/seats/availability/${selectedSeat}`, {
              dates: dates[0].getTime()
            });
            return res.data;
          })
        );
        setOpen(false);
        navigate("/");
      } catch (err) {
        setBerror(err);
      }
    }
    return (
      <div className="reserve">
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Select your seats:</span>
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.name}</div>
                <div className="rPrice">{item.price} rupees</div>
              </div>  
                <div className="rSelectRooms">
                  {item.seatNumbers.map((seatNumber) => (
                    <div className="room" key={seatNumber._id}>
                      <label>{seatNumber.number}</label>
                      <input
                        type="checkbox"
                        value={seatNumber._id}
                        onChange={handleSelect}
                        disabled={isAvailable(seatNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
          ))}
          <span>{berror}</span>
          <button onClick={(e)=>handleClick(e)} className="rButton">
            Reserve Now!
          </button>
        </div>
      </div>
    );
}
export default Reserve;