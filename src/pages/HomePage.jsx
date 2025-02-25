import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import FlightList from '../components/FlightList';
import Loader from '../components/Loader';

const HomePage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (flightDetailsArray) => {
    if (flightDetailsArray && flightDetailsArray.length > 0) {
      const formattedFlights = flightDetailsArray.map((flightDetails) => {
        const itinerary = flightDetails.data.itinerary;
        console.log("itinerary", itinerary);
        const leg = itinerary.legs[0];
        const carrier = itinerary.operatingCarrierSafetyAttributes[0];
        return {
          id: leg.id,
          airline: carrier.carrierName,
          flightNumber: leg.segments[0].flightNumber,
          price: itinerary.pricingOptions[0].totalPrice,
          duration: leg.duration,
          departureTime: leg.departure,
          arrivalTime: leg.arrival,
          origin: leg.origin.name,
          destination: leg.destination.name,
        };
      });
  
      console.log("Formatted Flights:", formattedFlights);
      setFlights(formattedFlights);
    } else {
      setFlights([]);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[url('https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg')] bg-contain bg-no-repeat bg-center w-full min-h-[30vh] sm:min-h-[40vh] md:min-h-[50vh] flex items-center justify-center mb-16 transition-all duration-300">
        <div className="text-[56px] text-center text-white self-end">Flights</div>
      </div>

      <SearchForm onSearch={handleSearch} setLoading={setLoading} />
      {loading ? (
        // <div className="text-center mt-8">Loading...</div>
        <Loader />
      ) : (
        <FlightList flights={flights} />
      )}
    </div>
  );
};

export default HomePage;
