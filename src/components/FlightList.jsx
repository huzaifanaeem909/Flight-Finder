import FlightCard from "./FlightCard";

const FlightList = ({ flights }) => {
  return (
    <div className="w-4/5 mx-auto mt-8 space-y-4">
      {flights.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No flights found. Try adjusting your search criteria.
        </div>
      ) : (
        flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      )}
    </div>
  );
};

export default FlightList;
