import { useState } from "react";
import axios from "axios";
import { API_ROUTES, API_KEY, API_HOST } from "../config";
import PassengerDropdown from "./PassengerDropdown";
import TravelClass from "./TravelClass";
import TripType from "./TripType";

import { IoMdSwap } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion";

const SearchForm = ({ onSearch, setLoading }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState("one-way");
  const [travelClass, setTravelClass] = useState("economy");
  const [isSwapped, setIsSwapped] = useState(false);

  // Swap function
  const handleSwap = () => {
    setIsSwapped((prev) => !prev);
    setTimeout(() => {
      setOrigin(destination);
      setDestination(origin);
    }, 200);
  };

  const fetchSkyId = async (query) => {
    try {
      const response = await axios.get(API_ROUTES.SEARCH_AIRPORT, {
        params: { query },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });

      console.log("Starting:", response.data);
      if (response.data && response.data.data.length > 0) {
        return {
          skyId: response.data.data[0].skyId,
          entityId: response.data.data[0].entityId,
        };
      } else {
        console.error(`No Sky ID found for: ${query}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching Sky ID:", error);
      return null;
    }
  };

  const fetchFlightDetails = async (itineraryId, legs, sessionId) => {
    try {
      const response = await axios.get(API_ROUTES.FLIGHT_DETAILS, {
        params: { itineraryId, sessionId,legs },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching flight details:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const originData = await fetchSkyId(origin);
    const destinationData = await fetchSkyId(destination);

    if (!originData || !destinationData) {
      console.error("Invalid Origin or Destination");
      setLoading(false);
      return;
    }

    const options = {
      params: {
        originSkyId: originData.skyId,
        originEntityId: originData.entityId,
        destinationSkyId: destinationData.skyId,
        destinationEntityId: destinationData.entityId,
        date,
        tripType,
        passengers,
        travelClass,
      },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    };

    try {
      const response = await axios.get(API_ROUTES.SEARCH_FLIGHTS, options);
      console.log("response", response.data);
      const flightData = response.data.data
      console.log("flightData", flightData);
      const sessionId = flightData.context.sessionId;
      console.log("sessionId", sessionId);
      
      const flightDetailsPromises = flightData.itineraries.map(async (itinerary) => {
        const itineraryId = itinerary.id;
        const legs = itinerary.legs.map(leg => ({
          origin: leg.origin.displayCode,
          destination: leg.destination.displayCode,
          date: leg.departure.split('T')[0]
        }));
        console.log("itineraryId", itineraryId);
        console.log("legs", legs);
        return await fetchFlightDetails(itineraryId, legs, sessionId);
      });

      let flightDetailsArray = await Promise.all(flightDetailsPromises);
      flightDetailsArray = flightDetailsArray.filter(details => details && details.status !== false);
      console.log("flightDetailsArray", flightDetailsArray);
      onSearch(flightDetailsArray);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#36373A] w-4/5 mx-auto p-6 rounded-lg shadow-md relative pb-12"
    >
      {/* Dropdown Row */}
      <div className="flex items-center gap-1 mb-4">
        {/* Trip Type */}
        <TripType value={tripType} onChange={setTripType} />

        {/* Passengers */}
        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="p-2 bg-[#36373A] text-[#9aa0a6] hover:bg-[#9aa0a61d] hover:rounded"
        >
          {[...Array(9)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} {i + 1 === 1 ? "Passenger" : "Passengers"}
            </option>
          ))}
        </select>

        {/* Class */}
        <TravelClass value={travelClass} onChange={setTravelClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        {/* Origin Input and Swap Button */}
        <div className="flex items-center w-full relative">
          {/* Origin Input */}
          <div className="relative w-[50%] mr-[-2%]">
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-4 pl-10 border rounded-md text-[#e8eaed] placeholder-[#e8eaed] bg-transparent"
              placeholder="Where from?"
              required
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              focusable="false"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#e8eaed] fill-current"
            >
              <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"></path>
            </svg>
          </div>

          {/* Swap Button */}
          <motion.button
            type="button"
            onClick={handleSwap}
            className="w-9 h-9 flex justify-center items-center bg-[#36373A] text-white p-2 rounded-full border border-[#e8eaed] hover:bg-gray-700 transition z-10"
            animate={{ rotate: isSwapped ? 180 : 0 }}
            transition={{ duration: 0.15, ease: "linear" }}
            whileTap={{ scale: 0.8 }}
          >
            <IoMdSwap size={20} />
          </motion.button>

          {/* Destination Input */}
          <div className="relative w-[50%] ml-[-2%]">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-4 pl-10 border rounded-md text-[#e8eaed] placeholder-[#e8eaed] bg-transparent"
              placeholder="Where to?"
              required
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              focusable="false"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#e8eaed] fill-current"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
              <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
          </div>
        </div>

        {/* Date Input */}
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full max-w-sm p-4 border rounded-md text-[#e8eaed] placeholder-[#e8eaed]"
            required
          />
        </div>
      </div>

      {/* Centered and Overlapping Button */}
      <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2">
        <button className="flex items-center justify-around bg-[#9DC0F9] text-[#202124] w-28 px-3 py-2 rounded-full cursor-pointer shadow-lg">
          <IoSearch size={20} className="inline" />
          <span className="">Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
