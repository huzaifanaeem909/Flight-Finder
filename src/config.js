export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_HOST = import.meta.env.VITE_API_HOST;

export const API_BASE_URL = 'https://sky-scrapper.p.rapidapi.com';

export const API_ROUTES = {

  SEARCH_AIRPORT: `${API_BASE_URL}/api/v1/flights/searchAirport/`,
  SEARCH_FLIGHTS: `${API_BASE_URL}/api/v2/flights/searchFlightsComplete/`,
  FLIGHT_DETAILS: `${API_BASE_URL}/api/v1/flights/getFlightDetails/`,

};