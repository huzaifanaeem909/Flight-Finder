import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plane, Calendar, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedDepartureDate = format(new Date(flight.departureTime), 'EEE, MMM d, yyyy');
  const formattedDepartureTime = format(new Date(flight.departureTime), 'h:mm a');
  const formattedArrivalDate = format(new Date(flight.arrivalTime), 'EEE, MMM d, yyyy');
  const formattedArrivalTime = format(new Date(flight.arrivalTime), 'h:mm a');

  const formatDuration = (durationInMinutes) => {
    if (typeof durationInMinutes === 'string' && durationInMinutes.includes('h')) {
      return durationInMinutes;
    }
    
    // Convert minutes to hours and minutes
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-[#36373A] shadow-md rounded-lg overflow-hidden mb-4 border border-gray-700">
      {/* Main card content - visible */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-700 p-2 rounded-full">
              <Plane className="text-blue-400 h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-100">{flight.airline}</h3>
              <p className="text-xs text-gray-400">Flight {flight.flightNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-400">${flight.price}</p>
            <div className="flex items-center justify-end text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDuration(flight.duration)}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <div className="flex-1">
            <div className="font-semibold text-lg text-gray-100">{flight.origin}</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formattedDepartureTime}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center px-2">
            <div className="relative w-full flex items-center justify-center">
              <div className="border-t-2 border-gray-600 border-dashed w-full absolute"></div>
              <div className="bg-blue-500 text-white rounded-full p-1 z-10">
                <Plane className="h-3 w-3 transform rotate-90" />
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-1">{formatDuration(flight.duration)}</span>
          </div>

          <div className="flex-1 text-right">
            <div className="font-semibold text-lg text-gray-100">{flight.destination}</div>
            <div className="flex items-center justify-end text-xs text-gray-400 mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formattedArrivalTime}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={toggleExpand}
          className="flex items-center justify-center w-full mt-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          <span className="text-xs font-medium mr-1">
            {expanded ? 'Show less' : 'Show details'}
          </span>
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Simplified appealing details section */}
      {expanded && (
        <div className="bg-gray-800 p-3 border-t border-gray-700">
          <div className="flex justify-between mb-2">
            <div className="flex-1 pr-2">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-gray-300">DEPARTURE</span>
              </div>
              <div className="bg-gray-700 rounded p-2">
                <div className="flex items-center mb-1">
                  <Calendar className="h-3 w-3 text-blue-400 mr-2" />
                  <span className="text-xs text-gray-300">{formattedDepartureDate}</span>
                </div>
                <div className="flex items-center mb-1">
                  <Clock className="h-3 w-3 text-blue-400 mr-2" />
                  <span className="text-xs text-gray-300">{formattedDepartureTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 text-blue-400 mr-2" />
                  <span className="text-xs text-gray-300">{flight.origin} Airport</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 pl-2">
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-xs font-medium text-gray-300">ARRIVAL</span>
              </div>
              <div className="bg-gray-700 rounded p-2">
                <div className="flex items-center mb-1">
                  <Calendar className="h-3 w-3 text-blue-400 mr-2" />
                  <span className="text-xs text-gray-300">{formattedArrivalDate}</span>
                </div>
                <div className="flex items-center mb-1">
                  <Clock className="h-3 w-3 text-blue-400 mr-2" />
                  <span className="text-xs text-gray-300">{formattedArrivalTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 text-blue-400 mr-2" />
                  <span className="text-xs text-gray-300">{flight.destination} Airport</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500 bg-opacity-20 rounded p-2 mt-2 flex items-center justify-center">
            <Clock className="h-3 w-3 text-white mr-2" />
            <span className="text-xs text-white font-medium">Flight duration: {formatDuration(flight.duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
