import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState,useContext } from "react";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
const Reserve = ({ setOpen, showId,showTime,duration }) => {
    const { data, loading, error } = useFetch(`/shows/seats/${showId}`);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const searchContext = useContext(SearchContext);
    const dates = (searchContext.dates === undefined||searchContext.dates.length===0) ? [""+new Date()] : [searchContext.dates[0].startDate];
    const startDate = new Date(dates[0]);
    const startTime = showTime.split(":");
    startDate.setHours(startTime[0], startTime[1]);
    const begin = startDate;
    const str1 = duration.split("h");
    const str2 = str1[1].substring(0, str1[1].length - 1);
    const dur = parseInt(str1[0])*60 + parseInt(str2);
    const blockedTimes = [];
    console.log(blockedTimes);
    const handleSelect = (e) => {
       const checked = e.target.checked;
       const value = e.target.value;
       setSelectedSeats(
         checked
           ? [...selectedSeats, value]
           : selectedSeats.filter((item) => item !== value)
       );
    };
    const handleClick = (e) => {
        e.preventDefault();
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
                <div className="rSelectRooms">
                  {item.seatNumbers.map((seatNumber) => (
                    <div className="room">
                      <label>{seatNumber.number}</label>
                      <input
                        type="checkbox"
                        value={seatNumber._id}
                        onChange={handleSelect}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={(e)=>handleClick(e)} className="rButton">
            Reserve Now!
          </button>
        </div>
      </div>
    );
}
export default Reserve;