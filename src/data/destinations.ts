export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude] for react-simple-maps
  description: string;
  image: string;
  activities: string[];
  mustDo: string[];
  mustSee: string[];
  mustEat: string[];
  weather: {
    temp: string;
    condition: string;
  };
  currency: string;
  timezone: string;
  bestMonths: string[];
  peakMonths: string[];
  offSeasonMonths: string[];
  avoidMonths: string[];
  recommendedDuration: string;
  itineraries: {
    threeDay: ItineraryDay[];
    fiveDay: ItineraryDay[];
    sevenDay: ItineraryDay[];
  };
  similarDestinations: string[]; // IDs
}

export const CATEGORIES = [
  "Beach", "Mountain", "City", "Culture", "Adventure", "Food", "Nature", "History", "Relaxation", "Nightlife"
];

const generateItinerary = (days: number, name: string): ItineraryDay[] => {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: `Exploring ${name} - Day ${i + 1}`,
    activities: [
      `Visit local landmarks in ${name}`,
      `Try authentic regional cuisine`,
      `Explore the hidden gems of the area`,
      `Relax and enjoy the atmosphere`
    ]
  }));
};

// Helper to create a destination with defaults
const createDest = (
  id: string,
  name: string,
  country: string,
  region: string,
  coords: [number, number],
  activities: string[],
  currency: string = "USD",
  timezone: string = "UTC+0"
): Destination => ({
  id,
  name,
  country,
  region,
  coordinates: coords,
  description: `${name} is a stunning destination in ${country} known for its unique ${activities[0].toLowerCase()} experiences and vibrant culture.`,
  image: `https://picsum.photos/seed/${id}/800/600`,
  activities,
  mustDo: [`Explore the city center`, `Take a guided tour`, `Meet the locals`],
  mustSee: [`Famous Landmark 1`, `Historical Museum`, `Scenic Viewpoint`],
  mustEat: [`Local Specialty 1`, `Traditional Dessert`, `Street Food`],
  weather: { temp: "22°C", condition: "Sunny" },
  currency,
  timezone,
  bestMonths: ["May", "June", "September", "October"],
  peakMonths: ["July", "August"],
  offSeasonMonths: ["November", "February"],
  avoidMonths: ["January"],
  recommendedDuration: "4-6 days",
  itineraries: {
    threeDay: generateItinerary(3, name),
    fiveDay: generateItinerary(5, name),
    sevenDay: generateItinerary(7, name),
  },
  similarDestinations: [] // Will be populated or left empty for demo
});

export const DESTINATIONS: Destination[] = [
  createDest("paris", "Paris", "France", "Europe", [2.3522, 48.8566], ["Culture", "Food", "History"], "EUR", "GMT+1"),
  createDest("tokyo", "Tokyo", "Japan", "Asia", [139.6503, 35.6762], ["City", "Food", "Nightlife"], "JPY", "GMT+9"),
  createDest("nyc", "New York City", "USA", "North America", [-74.0060, 40.7128], ["City", "Culture", "Nightlife"], "USD", "GMT-5"),
  createDest("bali", "Bali", "Indonesia", "Asia", [115.1889, -8.4095], ["Beach", "Relaxation", "Nature"], "IDR", "GMT+8"),
  createDest("rome", "Rome", "Italy", "Europe", [12.4964, 41.9028], ["History", "Culture", "Food"], "EUR", "GMT+1"),
  createDest("santorini", "Santorini", "Greece", "Europe", [25.4315, 36.3932], ["Beach", "Relaxation", "Nature"], "EUR", "GMT+2"),
  createDest("machu-picchu", "Machu Picchu", "Peru", "South America", [-72.5450, -13.1631], ["History", "Adventure", "Mountain"], "PEN", "GMT-5"),
  createDest("kyoto", "Kyoto", "Japan", "Asia", [135.7681, 35.0116], ["Culture", "History", "Nature"], "JPY", "GMT+9"),
  createDest("london", "London", "UK", "Europe", [-0.1278, 51.5074], ["City", "History", "Culture"], "GBP", "GMT+0"),
  createDest("barcelona", "Barcelona", "Spain", "Europe", [2.1734, 41.3851], ["Beach", "Food", "Culture"], "EUR", "GMT+1"),
  createDest("reykjavik", "Reykjavik", "Iceland", "Europe", [-21.9424, 64.1466], ["Nature", "Adventure", "Relaxation"], "ISK", "GMT+0"),
  createDest("cape-town", "Cape Town", "South Africa", "Africa", [18.4241, -33.9249], ["Nature", "Mountain", "Beach"], "ZAR", "GMT+2"),
  createDest("sydney", "Sydney", "Australia", "Oceania", [151.2093, -33.8688], ["Beach", "City", "Nature"], "AUD", "GMT+11"),
  createDest("dubai", "Dubai", "UAE", "Asia", [55.2708, 25.2048], ["City", "Adventure", "Nightlife"], "AED", "GMT+4"),
  createDest("amsterdam", "Amsterdam", "Netherlands", "Europe", [4.8952, 52.3702], ["Culture", "City", "History"], "EUR", "GMT+1"),
  createDest("venice", "Venice", "Italy", "Europe", [12.3155, 45.4408], ["Culture", "History", "Food"], "EUR", "GMT+1"),
  createDest("prague", "Prague", "Czech Republic", "Europe", [14.4378, 50.0755], ["History", "Culture", "City"], "CZK", "GMT+1"),
  createDest("vienna", "Vienna", "Austria", "Europe", [16.3738, 48.2082], ["Culture", "History", "Food"], "EUR", "GMT+1"),
  createDest("lisbon", "Lisbon", "Portugal", "Europe", [-9.1393, 38.7223], ["Culture", "Food", "History"], "EUR", "GMT+0"),
  createDest("rio", "Rio de Janeiro", "Brazil", "South America", [-43.1729, -22.9068], ["Beach", "Nature", "Nightlife"], "BRL", "GMT-3"),
  createDest("cairo", "Cairo", "Egypt", "Africa", [31.2357, 30.0444], ["History", "Culture", "Adventure"], "EGP", "GMT+2"),
  createDest("bangkok", "Bangkok", "Thailand", "Asia", [100.5018, 13.7563], ["Food", "City", "Culture"], "THB", "GMT+7"),
  createDest("singapore", "Singapore", "Singapore", "Asia", [103.8198, 1.3521], ["City", "Food", "Nature"], "SGD", "GMT+8"),
  createDest("seoul", "Seoul", "South Korea", "Asia", [126.9780, 37.5665], ["City", "Food", "Nightlife"], "KRW", "GMT+9"),
  createDest("istanbul", "Istanbul", "Turkey", "Europe", [28.9784, 41.0082], ["History", "Culture", "Food"], "TRY", "GMT+3"),
  createDest("athens", "Athens", "Greece", "Europe", [23.7275, 37.9838], ["History", "Culture", "Food"], "EUR", "GMT+2"),
  createDest("berlin", "Berlin", "Germany", "Europe", [13.4050, 52.5200], ["History", "Nightlife", "Culture"], "EUR", "GMT+1"),
  createDest("munich", "Munich", "Germany", "Europe", [11.5820, 48.1351], ["Culture", "Food", "History"], "EUR", "GMT+1"),
  createDest("florence", "Florence", "Italy", "Europe", [11.2558, 43.7696], ["Culture", "History", "Food"], "EUR", "GMT+1"),
  createDest("dublin", "Dublin", "Ireland", "Europe", [-6.2603, 53.3498], ["Culture", "History", "Nightlife"], "EUR", "GMT+0"),
  createDest("edinburgh", "Edinburgh", "UK", "Europe", [-3.1883, 55.9533], ["History", "Culture", "Nature"], "GBP", "GMT+0"),
  createDest("stockholm", "Stockholm", "Sweden", "Europe", [18.0686, 59.3293], ["City", "Nature", "Culture"], "SEK", "GMT+1"),
  createDest("oslo", "Oslo", "Norway", "Europe", [10.7522, 59.9139], ["Nature", "City", "Culture"], "NOK", "GMT+1"),
  createDest("copenhagen", "Copenhagen", "Denmark", "Europe", [12.5683, 55.6761], ["City", "Culture", "Food"], "DKK", "GMT+1"),
  createDest("helsinki", "Helsinki", "Finland", "Europe", [24.9384, 60.1699], ["City", "Nature", "Culture"], "EUR", "GMT+2"),
  createDest("madrid", "Madrid", "Spain", "Europe", [-3.7038, 40.4168], ["Culture", "Food", "City"], "EUR", "GMT+1"),
  createDest("seville", "Seville", "Spain", "Europe", [-5.9845, 37.3891], ["Culture", "History", "Food"], "EUR", "GMT+1"),
  createDest("marrakech", "Marrakech", "Morocco", "Africa", [-7.9811, 31.6295], ["Culture", "Food", "History"], "MAD", "GMT+1"),
  createDest("casablanca", "Casablanca", "Morocco", "Africa", [-7.5898, 33.5731], ["Culture", "City", "Food"], "MAD", "GMT+1"),
  createDest("petra", "Petra", "Jordan", "Asia", [35.4444, 30.3285], ["History", "Adventure", "Culture"], "JOD", "GMT+3"),
  createDest("zermatt", "Zermatt", "Switzerland", "Europe", [7.7491, 46.0207], ["Mountain", "Adventure", "Relaxation"], "CHF", "GMT+1"),
  createDest("interlaken", "Interlaken", "Switzerland", "Europe", [7.8632, 46.6863], ["Adventure", "Nature", "Mountain"], "CHF", "GMT+1"),
  createDest("lucerne", "Lucerne", "Switzerland", "Europe", [8.3093, 47.0502], ["Nature", "History", "Relaxation"], "CHF", "GMT+1"),
  createDest("san-francisco", "San Francisco", "USA", "North America", [-122.4194, 37.7749], ["City", "Nature", "Food"], "USD", "GMT-8"),
  createDest("los-angeles", "Los Angeles", "USA", "North America", [-118.2437, 34.0522], ["City", "Beach", "Nightlife"], "USD", "GMT-8"),
  createDest("chicago", "Chicago", "USA", "North America", [-87.6298, 41.8781], ["City", "Food", "Culture"], "USD", "GMT-6"),
  createDest("miami", "Miami", "USA", "North America", [-80.1918, 25.7617], ["Beach", "Nightlife", "Food"], "USD", "GMT-5"),
  createDest("new-orleans", "New Orleans", "USA", "North America", [-90.0715, 29.9511], ["Culture", "Food", "Nightlife"], "USD", "GMT-6"),
  createDest("vancouver", "Vancouver", "Canada", "North America", [-123.1207, 49.2827], ["Nature", "City", "Adventure"], "CAD", "GMT-8"),
  createDest("toronto", "Toronto", "Canada", "North America", [-79.3832, 43.6532], ["City", "Food", "Culture"], "CAD", "GMT-5"),
  createDest("montreal", "Montreal", "Canada", "North America", [-73.5673, 45.5017], ["Culture", "Food", "History"], "CAD", "GMT-5"),
  createDest("mexico-city", "Mexico City", "Mexico", "North America", [-99.1332, 19.4326], ["Food", "Culture", "History"], "MXN", "GMT-6"),
  createDest("cancun", "Cancun", "Mexico", "North America", [-86.8515, 21.1619], ["Beach", "Relaxation", "Nightlife"], "MXN", "GMT-6"),
  createDest("tulum", "Tulum", "Mexico", "North America", [-87.4624, 20.2114], ["Beach", "History", "Relaxation"], "MXN", "GMT-6"),
  createDest("buenos-aires", "Buenos Aires", "Argentina", "South America", [-58.3816, -34.6037], ["Culture", "Food", "Nightlife"], "ARS", "GMT-3"),
  createDest("santiago", "Santiago", "Chile", "South America", [-70.6693, -33.4489], ["City", "Mountain", "Culture"], "CLP", "GMT-4"),
  createDest("lima", "Lima", "Peru", "South America", [-77.0428, -12.0464], ["Food", "History", "Culture"], "PEN", "GMT-5"),
  createDest("cusco", "Cusco", "Peru", "South America", [-71.9675, -13.5319], ["History", "Culture", "Adventure"], "PEN", "GMT-5"),
  createDest("cartagena", "Cartagena", "Colombia", "South America", [-75.5144, 10.3910], ["History", "Beach", "Culture"], "COP", "GMT-5"),
  createDest("medellin", "Medellin", "Colombia", "South America", [-75.5646, 6.2442], ["City", "Culture", "Nature"], "COP", "GMT-5"),
  createDest("bogota", "Bogota", "Colombia", "South America", [-74.0721, 4.7110], ["City", "Culture", "Food"], "COP", "GMT-5"),
  createDest("quito", "Quito", "Ecuador", "South America", [-78.4678, -0.1807], ["History", "Mountain", "Culture"], "USD", "GMT-5"),
  createDest("galapagos", "Galapagos Islands", "Ecuador", "South America", [-90.9656, -0.9538], ["Nature", "Adventure", "Relaxation"], "USD", "GMT-6"),
  createDest("havana", "Havana", "Cuba", "North America", [-82.3666, 23.1136], ["Culture", "History", "Nightlife"], "CUP", "GMT-5"),
  createDest("kingston", "Kingston", "Jamaica", "North America", [-76.7936, 17.9714], ["Culture", "Beach", "Food"], "JMD", "GMT-5"),
  createDest("nassau", "Nassau", "Bahamas", "North America", [-77.3504, 25.0443], ["Beach", "Relaxation", "Adventure"], "BSD", "GMT-5"),
  createDest("punta-cana", "Punta Cana", "Dominican Republic", "North America", [-68.3725, 18.5601], ["Beach", "Relaxation", "Adventure"], "DOP", "GMT-4"),
  createDest("san-juan", "San Juan", "Puerto Rico", "North America", [-66.1057, 18.4655], ["History", "Beach", "Food"], "USD", "GMT-4"),
  createDest("revelstoke", "Revelstoke", "Canada", "North America", [-118.1957, 50.9981], ["Mountain", "Adventure", "Nature"], "CAD", "GMT-8"),
  createDest("banff", "Banff", "Canada", "North America", [-115.5708, 51.1784], ["Mountain", "Nature", "Adventure"], "CAD", "GMT-7"),
  createDest("whistler", "Whistler", "Canada", "North America", [-122.9574, 50.1163], ["Mountain", "Adventure", "Nightlife"], "CAD", "GMT-8"),
  createDest("queenstown", "Queenstown", "New Zealand", "Oceania", [168.6626, -45.0312], ["Adventure", "Nature", "Mountain"], "NZD", "GMT+13"),
  createDest("auckland", "Auckland", "New Zealand", "Oceania", [174.7633, -36.8485], ["City", "Nature", "Adventure"], "NZD", "GMT+13"),
  createDest("melbourne", "Melbourne", "Australia", "Oceania", [144.9631, -37.8136], ["City", "Food", "Culture"], "AUD", "GMT+11"),
  createDest("brisbane", "Brisbane", "Australia", "Oceania", [153.0251, -27.4698], ["City", "Nature", "Relaxation"], "AUD", "GMT+10"),
  createDest("perth", "Perth", "Australia", "Oceania", [115.8605, -31.9505], ["Beach", "Nature", "Relaxation"], "AUD", "GMT+8"),
  createDest("fiji", "Fiji", "Fiji", "Oceania", [178.0650, -17.7134], ["Beach", "Relaxation", "Nature"], "FJD", "GMT+12"),
  createDest("bora-bora", "Bora Bora", "French Polynesia", "Oceania", [-151.7415, -16.5004], ["Beach", "Relaxation", "Nature"], "XPF", "GMT-10"),
  createDest("tahiti", "Tahiti", "French Polynesia", "Oceania", [-149.4068, -17.6509], ["Beach", "Nature", "Culture"], "XPF", "GMT-10"),
  createDest("moorea", "Moorea", "French Polynesia", "Oceania", [-149.8277, -17.5388], ["Beach", "Nature", "Adventure"], "XPF", "GMT-10"),
  createDest("hanoi", "Hanoi", "Vietnam", "Asia", [105.8342, 21.0285], ["Food", "History", "Culture"], "VND", "GMT+7"),
  createDest("ho-chi-minh", "Ho Chi Minh City", "Vietnam", "Asia", [106.6297, 10.8231], ["City", "Food", "History"], "VND", "GMT+7"),
  createDest("da-nang", "Da Nang", "Vietnam", "Asia", [108.2022, 16.0544], ["Beach", "City", "History"], "VND", "GMT+7"),
  createDest("siem-reap", "Siem Reap", "Cambodia", "Asia", [103.8560, 13.3633], ["History", "Culture", "Adventure"], "KHR", "GMT+7"),
  createDest("phnom-penh", "Phnom Penh", "Cambodia", "Asia", [104.9282, 11.5449], ["History", "Culture", "City"], "KHR", "GMT+7"),
  createDest("luang-prabang", "Luang Prabang", "Laos", "Asia", [102.1347, 19.8833], ["Culture", "Nature", "History"], "LAK", "GMT+7"),
  createDest("yangon", "Yangon", "Myanmar", "Asia", [96.1561, 16.8661], ["History", "Culture", "Food"], "MMK", "GMT+6.5"),
  createDest("mumbai", "Mumbai", "India", "Asia", [72.8777, 19.0760], ["City", "Food", "Culture"], "INR", "GMT+5.5"),
  createDest("delhi", "Delhi", "India", "Asia", [77.2090, 28.6139], ["History", "Food", "Culture"], "INR", "GMT+5.5"),
  createDest("jaipur", "Jaipur", "India", "Asia", [75.7873, 26.9124], ["History", "Culture", "Food"], "INR", "GMT+5.5"),
  createDest("agra", "Agra", "India", "Asia", [78.0081, 27.1767], ["History", "Culture", "Food"], "INR", "GMT+5.5"),
  createDest("goa", "Goa", "India", "Asia", [74.1240, 15.2993], ["Beach", "Nightlife", "Relaxation"], "INR", "GMT+5.5"),
  createDest("kathmandu", "Kathmandu", "Nepal", "Asia", [85.3240, 27.7172], ["Culture", "History", "Mountain"], "NPR", "GMT+5.75"),
  createDest("pokhara", "Pokhara", "Nepal", "Asia", [83.9856, 28.2096], ["Adventure", "Nature", "Mountain"], "NPR", "GMT+5.75"),
  createDest("colombo", "Colombo", "Sri Lanka", "Asia", [79.8612, 6.9271], ["City", "Food", "Culture"], "LKR", "GMT+5.5"),
  createDest("kandy", "Kandy", "Sri Lanka", "Asia", [80.6337, 7.2906], ["Culture", "Nature", "History"], "LKR", "GMT+5.5"),
  createDest("male", "Male", "Maldives", "Asia", [73.5089, 4.1755], ["Beach", "Relaxation", "Nature"], "MVR", "GMT+5"),
  createDest("seychelles", "Seychelles", "Seychelles", "Africa", [55.4920, -4.6796], ["Beach", "Nature", "Relaxation"], "SCR", "GMT+4"),
  createDest("mauritius", "Mauritius", "Mauritius", "Africa", [57.5522, -20.3484], ["Beach", "Nature", "Adventure"], "MUR", "GMT+4"),
  createDest("zanzibar", "Zanzibar", "Tanzania", "Africa", [39.2026, -6.1659], ["Beach", "Culture", "History"], "TZS", "GMT+3"),
  createDest("nairobi", "Nairobi", "Kenya", "Africa", [36.8219, -1.2921], ["Nature", "City", "Adventure"], "KES", "GMT+3"),
  createDest("johannesburg", "Johannesburg", "South Africa", "Africa", [28.0473, -26.2041], ["City", "Culture", "History"], "ZAR", "GMT+2"),
];

// Populate similar destinations randomly for demo
DESTINATIONS.forEach(dest => {
  const others = DESTINATIONS.filter(d => d.id !== dest.id);
  dest.similarDestinations = others
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map(d => d.id);
});
