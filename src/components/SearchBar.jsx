import React, { useState, useEffect, useRef } from "react";
import { cities } from "../utils/cities";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const locationInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    const filteredCities = cities
      .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);

    setSuggestions(filteredCities);
  };

  const handleSuggestionClick = (city) => {
    setLocation(city);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleLocationFocus = () => {
    setIsFocused(true);
    setSuggestions(cities.slice(0, 10));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locationInputRef]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mx-0 px-0 py-0 my-0" >
        
        <div className="col-md-5 col-12" style={{ position: "relative" }}>
          <input
            className="form-control py-2"
            style={{ paddingLeft: "35px"}}
            id="search-keyword-input"
            type="search"
            placeholder="Job title, keyword or company"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
         
          <i className="bi bi-search"
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              fontSize: "18px",
            }}
          />
        </div>
        <div
          className="col-md-5 col-12"
          style={{ position: "relative" }}
          ref={locationInputRef}
        >
          <input
            className="form-control py-2"
            id="search-location-input"
            type="search"
            placeholder="City"
            value={location}
            onChange={handleLocationChange}
            onFocus={handleLocationFocus}
            style={{ paddingLeft: "35px" }}
          />
          <i className="bi bi-geo-alt-fill"
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              fontSize: "18px",
            }}
          />
          {isFocused && suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100"
              style={{ zIndex: 1 }}
            >
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action d-flex align-items-center"
                  onMouseDown={() => handleSuggestionClick(city)}
                >
                  <FaMapMarkerAlt style={{ marginRight: "10px" }} />
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-2 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Search jobs
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
