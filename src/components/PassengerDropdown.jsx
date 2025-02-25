import { useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const PassengerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const [travelClass, setTravelClass] = useState("Economy");

  const dropdownRef = useRef(null);

  // Function to handle increment/decrement
  const updateCount = (type, amount) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount), // Ensures count doesn't go below 0
    }));
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-56">
      {/* Button to open dropdown */}
      <button
        className="flex items-center justify-between w-full bg-[#202124] text-white px-4 py-2 rounded-md border border-gray-500"
        onClick={toggleDropdown}
      >
        <span className="flex items-center gap-2">
          <FaUser /> {passengers.adults + passengers.children + passengers.infantsInSeat + passengers.infantsOnLap}
        </span>
        <span className="ml-2">{travelClass}</span>
        <IoMdArrowDropdown />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute w-full bg-[#202124] text-white mt-2 p-4 rounded-md shadow-lg border border-gray-600"
        >
          {/* Adult Count */}
          <div className="flex justify-between items-center py-2">
            <span>Adults</span>
            <div className="flex items-center">
              <button onClick={() => updateCount("adults", -1)} className="px-2 bg-gray-700 rounded">-</button>
              <span className="mx-2">{passengers.adults}</span>
              <button onClick={() => updateCount("adults", 1)} className="px-2 bg-gray-700 rounded">+</button>
            </div>
          </div>

          {/* Children Count */}
          <div className="flex justify-between items-center py-2">
            <span>Children <small className="text-gray-400">(2-11)</small></span>
            <div className="flex items-center">
              <button onClick={() => updateCount("children", -1)} className="px-2 bg-gray-700 rounded">-</button>
              <span className="mx-2">{passengers.children}</span>
              <button onClick={() => updateCount("children", 1)} className="px-2 bg-gray-700 rounded">+</button>
            </div>
          </div>

          {/* Infants in Seat */}
          <div className="flex justify-between items-center py-2">
            <span>Infants <small className="text-gray-400">In seat</small></span>
            <div className="flex items-center">
              <button onClick={() => updateCount("infantsInSeat", -1)} className="px-2 bg-gray-700 rounded">-</button>
              <span className="mx-2">{passengers.infantsInSeat}</span>
              <button onClick={() => updateCount("infantsInSeat", 1)} className="px-2 bg-gray-700 rounded">+</button>
            </div>
          </div>

          {/* Infants on Lap */}
          <div className="flex justify-between items-center py-2">
            <span>Infants <small className="text-gray-400">On lap</small></span>
            <div className="flex items-center">
              <button onClick={() => updateCount("infantsOnLap", -1)} className="px-2 bg-gray-700 rounded">-</button>
              <span className="mx-2">{passengers.infantsOnLap}</span>
              <button onClick={() => updateCount("infantsOnLap", 1)} className="px-2 bg-gray-700 rounded">+</button>
            </div>
          </div>

          {/* Class Selection */}
          {/* <div className="mt-4">
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div> */}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">Cancel</button>
            <button onClick={() => setIsOpen(false)} className="text-blue-400 hover:text-blue-500">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDropdown;
