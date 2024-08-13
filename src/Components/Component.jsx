import React, { useEffect, useState, useCallback } from "react";
import Input from "./ui/input";
import { SearchIcon } from "./icons/SearchIcon";
import { XIcon } from "./icons/XIcon"; // Assuming you have an XIcon component
import axios from "axios";
import { displayIcon } from "../Logic/IconDisplay";
import Loading from "../Loading/Loading";
import _ from "lodash";
import { getWeatherCondition } from "../Logic/WeatherState";

const Component = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [searchWeatherData, setSearchWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude, setCurrentWeatherData);
          fetchLocationName(latitude, longitude, setCurrentLocation);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherData = (latitude, longitude, setData) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weathercode&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching weather data: ",
          error.response ? error.response.data : error.message
        );
      });
  };

  const fetchLocationName = (latitude, longitude, setLocation) => {
    const apiKey = "01547a0512cd4284b3f4b82b842d451d";
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data && response.data.features.length > 0) {
          setLocation(response.data.features[0].properties.formatted);
        } else {
          setLocation("Unknown location");
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching location name: ",
          error.response ? error.response.data : error.message
        );
      });
  };

  const fetchSuggestions = (query) => {
    const apiKey = "01547a0512cd4284b3f4b82b842d451d";
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data && response.data.features) {
          setSuggestions(response.data.features);
        }
      })
      .catch((error) => {
        console.error(
          "Error fetching suggestions: ",
          error.response ? error.response.data : error.message
        );
      });
  };

  const debouncedFetchSuggestions = useCallback(
    _.debounce(fetchSuggestions, 300),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query.trim()) {
      debouncedFetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const { geometry } = suggestion;
    if (geometry && geometry.coordinates) {
      const [longitude, latitude] = geometry.coordinates;
      fetchWeatherData(latitude, longitude, setSearchWeatherData);
      setSearchLocation(suggestion.properties.formatted);
      setSuggestions([]);
    } else {
      console.error("Geometry or coordinates not found in suggestion.");
    }
  };

  const handleClearInput = () => {
    setSearchInput("");
    setSearchWeatherData(null);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col h-screen bg-cover bg-center bg-gray-200">
      {/* <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/snowfallvd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <img  className="absolute inset-0 w-full h-full object-cover" src="https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg" alt="" />
      <header className="bg-black relative bg-opacity-50 py-4 px-6 shadow">
        <div className="flex items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl pl-12 text-white font-bold">UpWeather</h1>
            <a
              href="https://github.com/AshishBKallada"
              className="ml-12 text-lg text-gray-300 font-cursive"
            >
              Empowering Your Forecast
            </a>
          </div>
          <img
            className="h-12 w-12 ml-4 rounded-full"
            src="/bearspin.gif"
            alt="Weather Icon"
          />
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 relative md:grid-cols-2 gap-8 p-8">
        <section className="bg-black bg-opacity-50 text-white rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center gap-4">
          {currentWeatherData && currentWeatherData.current ? (
            <>
              <div className="w-full flex flex-col items-center justify-center">
                <div className="flex items-center">
                  {displayIcon(currentWeatherData?.current?.weathercode)}
                  <div className="text-lg font-bold">
                    {getWeatherCondition(
                      currentWeatherData?.current?.weathercode
                    )}
                  </div>
                </div>
                <div className="flex flex-col-1 justify-center items-center gap-6 w-full">
                  <div>
                    <div className="text-5xl flex items-center justify-center font-bold">
                      {currentWeatherData.current.temperature_2m}°C
                    </div>
                    <div className="text-xl text-muted-foreground">
                      Wind Speed: {currentWeatherData.current.wind_speed_10m}{" "}
                      km/h
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground text-center text-lg">
                  {currentLocation}
                </div>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </section>
        <section className="bg-black bg-opacity-50 text-white rounded-lg shadow-xl p-8 flex flex-col gap-4">
          <div className="relative flex items-center gap-4 w-full">
            <SearchIcon className="absolute left-3 w-6 h-6 text-gray-300" />
            <Input
              type="text"
              placeholder="Enter a location"
              className="flex-1 bg-muted rounded-md pl-12 pr-10 py-3 text-lg"
              onChange={handleInputChange}
              value={searchInput}
            />
            {searchInput && (
              <button
                onClick={handleClearInput}
                className="absolute right-3 w-6 h-6 text-gray-500"
              >
                <XIcon />
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="bg-black bg-opacity-50 rounded-md mt-2 max-h-60 overflow-auto w-full">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.properties.place_id}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col items-center justify-center flex-1 mt-4">
            {searchWeatherData && searchWeatherData.current ? (
              <>
                {displayIcon(searchWeatherData?.current?.weathercode)}
                <div className="text-lg font-bold text-center">
                  {getWeatherCondition(searchWeatherData.current.weathercode)}
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold">
                    {searchWeatherData.current.temperature_2m}°C
                  </div>
                  <div className="text-xl text-muted-foreground">
                    Wind Speed: {searchWeatherData.current.wind_speed_10m} km/h
                  </div>
                </div>
                <p className="text-muted-foreground text-lg">
                  {searchLocation}
                </p>
                <img
                  className="h-48 w-48"
                  src="https://media.tenor.com/LJWck697gL0AAAAi/polar-bear-bear.gif"
                  alt=""
                />
              </>
            ) : (
              <h2 className="text-lg text-muted-foreground text-center">
                <img
                  className="w-56 h-56"
                  src="https://media.tenor.com/iyOOkFq5RLQAAAAi/what-looking.gif"
                  alt=""
                />
                Search for a location to see the weather
              </h2>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Component;
