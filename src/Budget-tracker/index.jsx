import { db } from '@/Service/firebaseConfig';
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
// import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from './Redux/budgetSlice';
import { useNavigation } from 'react-router-dom';
import Pcard from './pcard';
import HotelCard from  './hcard';
import Tripsummary from './tripsummary';
import { Button } from '@/components/ui/button';
// const currencyRates = {
//   AED: 0.27,  // 1 USD = 3.67 AED
//   GBP: 1.25,  // 1 USD = 0.80 GBP
//   INR: 0.012, // 1 USD = 75 INR
//   USD: 1      // Base currency
// };

const Budget = () => {
  const [trip, setTrip] = useState(null);  // Trip details state
  const [userTrips, setUserTrips] = useState([]);  // Store user's trips
  const [selectedTripId, setSelectedTripId] = useState('');  // Selected trip ID
  const [newBudget, setNewBudget] = useState('');  // Budget input
  // const [remainingBudget, setRemainingBudget] = useState(0); // Track remaining budget
  const [hotelSelected, setHotelSelected] = useState(false);  // State to track hotel selection
  const [Rediv,setRediv]=useState(false);
  // const [expenseList, setExpenseList] = useState([]);  // List of expenses
  // const [travelList, setTravelList] = useState([]);  // List of selected items (both paid and free)
  const [selectedType, setSelectedType] = useState('hotels');  // Dropdown type for hotels/places
  const [selectedDay, setSelectedDay] = useState('');  // Selected day for itinerary
  const [selectedTime, setSelectedTime] = useState('');  // Selected time for activities
  const [currency, setCurrency] = useState('USD'); // New state for currency selection

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dispatch = useDispatch();
  const  remainingBudget = useSelector((state) => state.budget.remainingBudget); // Get remaining budget from Redux
  const expenseList = useSelector((state) => state.budget.expenseList); // Fetch expense list from Redux
  const travelList = useSelector((state) => state.budget.travelList); // Fetch travel list from Redux
  const budgetState = useSelector((state) => state.budget);
  const navigate=useNavigation()
  useEffect(() => {
    checkUserTrips();
  }, []);

  const checkUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    const tripsRef = collection(db, 'AITRIPS');
    const q = query(tripsRef, where('userEmail', '==', user?.email));  // Fetch trips for the logged-in user
    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUserTrips(trips);  // Store user trips
  };

  const openTravelGuru=async()=>{
navigate("track-budget/travel-guru")
  }
  const fetchTripDetails = async (tripId) => {
    const tripRef = doc(db, 'AITRIPS', tripId);
    const tripSnap = await getDoc(tripRef);
    if (tripSnap.exists()) {
      setTrip(tripSnap.data());
    } else {
      toast.error('Trip not found');
    }
  };

  const handleTripSelection = (e) => {
    const selectedId = e.target.value;
    setSelectedTripId(selectedId);
    if (selectedId) {
      fetchTripDetails(selectedId);  // Fetch details for selected trip
    }
  };

  const handleSetBudget = () => {
    const parsedBudget = parseFloat(newBudget);
    if (!isNaN(parsedBudget) && parsedBudget > 0) {
      //  setRemainingBudget(parsedBudget);
      // const budgetInUSD = parsedBudget / currencyRates[currency]; // Convert to USD

      dispatch(setBudget(parsedBudget));
      toast.success('Budget set successfully');
    } else {
      toast.error('Invalid budget');
    }
  };

  const handleHotelSelect = (hotelName) => {
    
    setHotelSelected(true);
    setRediv(true);
   
};
  // const addToExpense = (item) => {
  //   const price = parseFloat(item.price);
  //   if (!isNaN(price)) {
  //     const totalExpense = expenseList.reduce((acc, curr) => acc + curr.price, 0) + price;

  //     if (totalExpense <= remainingBudget) {
  //       setExpenseList([...expenseList, { ...item, price }]);
  //       setTravelList([...travelList, item]);  // Add to travel list
  //       setRemainingBudget(remainingBudget - price);  // Deduct the expense from the budget
  //       toast.success('Added to expenses');
  //     } else {
  //       toast.error('Insufficient budget!');
  //     }
  //   } else {
  //     toast.error('Invalid price');
  //   }
  // };
  // const handleItinerarySelect = (itineraryItem) => {
  //   const itemPrice = itineraryItem?.ticketPricing ? parseFloat(itineraryItem.ticketPricing) : 0;

  //   if (itemPrice > 0) {
  //     // If the item is paid, add it to both expenseList and travelList
  //     addToExpense(itineraryItem);
  //   } else {
  //     // If the item is free, just add it to travelList
  //     setTravelList([...travelList, itineraryItem]);
  //   }
  // };

  // const handleHotelBook = (hotel) => {
  //   let randomPrice;

  //   if (hotel.price && typeof hotel.price === 'object') {
  //     if (hotel.price.min != null && hotel.price.max != null) {
  //       randomPrice = Math.floor(Math.random() * (hotel.price.max - hotel.price.min + 1)) + hotel.price.min;
  //     } else {
  //       randomPrice = 0;
  //     }
  //   } else if (typeof hotel.price === 'number') {
  //     randomPrice = hotel.price;
  //   } else {
  //     randomPrice = 0;
  //   }

  //   const tripDays = trip?.userSelection?.days || 1;
  //   const totalCost = randomPrice * Math.max(tripDays, 1);
    
  //   const expenseItem = { ...hotel, price: totalCost };
  //   addToExpense(expenseItem);

    
  // };

  return (
    <div>
      <div className="p-5 border border-black mx-auto" style={{ width: '1000px', height: 'auto' }}>
        <h1 className="text-2xl font-bold text-center">Budget Tracker</h1>
  
        {/* Trip Selection */}
        <div className="mb-4 text-center">
          <label>Select a Trip:</label>
          <select
            onChange={handleTripSelection}
            className="bg-white text-black border border-gray-300 rounded px-2 py-1"
          >
            <option value="">Select Trip</option>
            {userTrips.map((trip, index) => (
              <option key={trip?.id} value={trip?.id}>
                {trip.userSelection?.location}
              </option>
            ))}
          </select>
        </div>
  
  {/* Currency Selection */}
  <div className='flex justify-center gap-4'>
  <div className="mb-4 text-center">
          <label>Select Currency:</label>
          <select
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-white text-black border border-gray-300 rounded px-2 py-1"
          >
            <option value="USD">USD</option>
            <option value="AED">AED</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>
       {/* Budget Input */}
       <div className="mb-4 text-center">
          <input
            type="number"
            placeholder="Enter your budget"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="border px-2 py-1 bg-white"
          />
          <button onClick={handleSetBudget} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
            Set Budget
          </button>
        </div>
        </div>
  
        <p className="text-center">Remaining Budget: ${remainingBudget}</p>

        {/* Show selected trip data */}
        {trip?.userSelection?.location ? (
          <div className={`grid ${selectedType === 'places' ? 'grid-cols-1' : 'grid-cols-1'} gap-5 justify-center`}>
            {/* Column 1: Hotel/Places */}
            <div className="text-center">
              <h2 className="text-xl font-bold">Select Hotel/Places</h2>
              <select
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white text-black border border-gray-300 rounded px-2 py-1"
              >
                <option value="hotels">Hotels</option>
                <option value="places">Places</option>
              </select>
  
              {/* Display Hotels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {!hotelSelected&&  selectedType === 'hotels' && 
                  trip?.tripData?.hotels?.map((hotel, index) => (
                    
                    <HotelCard key={index} hotel={hotel} trip={trip} onSelect={handleHotelSelect} />
                  ))}
              </div>
              { Rediv && hotelSelected && (
                <div className="text-center">
                    <p className="text-red-500">You can only select an itinerary now.</p>
                </div>
            )}
            </div>
  
            {/* Column 2: Daywise Itinerary */}
            
            {selectedType === 'places' && (
              
              <div className=''>
                <h2 className="text-xl font-bold">Daywise Itinerary</h2>
                <select
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="bg-white text-black border border-gray-300 rounded px-2 py-1 mb-4"
                >
                  {trip?.tripData?.itinerary?.map((item, index) => (
                    <option key={index} value={index}>
                      Day {index + 1} ({daysOfWeek[new Date(item?.day).getDay()+1]})
                    </option>
                  ))}
                </select>
  
                {/* Render the places for the selected day */}
                {selectedDay !== null && (
                  <div className="border p-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
                    {trip?.tripData?.itinerary[selectedDay]?.plan?.map((place, placeIndex) => (
                      <div key={placeIndex} className="mb-3">
                        <h2 className="font-medium text-sm text-orange-600">{place.timeTravel}</h2>
                        <Pcard key={placeIndex}  place={place} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Loading trip details...</p>
        )}
      </div>
      
      
      <div className=' '>
      <h1 className='flex justify-center font-bold'>Trip Summary</h1>
      
      <Tripsummary/>
      </div>
      <div className='flex justify-end mr-10 mt-2 mb-2 '>
      <Button className="flex-wrap mr-4" onClick={openTravelGuru}>Check Travel Guru</Button>
    <Button className="flex-wrap">Checkout</Button>
    </div>
    </div>
  );
  }
;


export default Budget;
