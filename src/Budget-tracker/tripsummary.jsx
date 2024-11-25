import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense } from './Redux/budgetSlice';

const Tripsummary = () => {
  const dispatch = useDispatch();

  const expenseList = useSelector((state) => state.budget.expenseList);
  const travelList = useSelector((state) => state.budget.travelList);
  const remainingBudget = useSelector((state) => state.budget.remainingBudget);

  // Calculate total spent amount
  const totalSpent = expenseList.reduce((acc, hotel) => acc + hotel.price, 0) +
                     travelList.reduce((acc, place) => acc + (place.cost || 0), 0);

  const filteredTravelList = travelList.filter((place) => place.placeName !== 'Hotels Booked');

  const handleRemoveItem = (placeName) => {
    dispatch(removeExpense({ placeName }));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mt-4">Booked Hotel</h3>
      {expenseList.filter(hotel => hotel.hotelName).length === 0 ? (
        <p className="text-center text-red-500">No hotels booked yet.</p>
      ) : (
        <div>
          {expenseList.filter(hotel => hotel.hotelName).map((hotel, index) => (
            <div key={index} className='flex justify-center gap-4'>
              <h2 className="border px-4 py-2">{hotel.hotelName}</h2>
              <p>Cost: ${hotel.price}</p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-semibold mt-4">Itinerary Selected</h3>
      {filteredTravelList.length === 0 ? (
        <p className="text-center text-red-500">No itineraries selected yet.</p>
      ) : (
        <div className="flex justify-center overflow-x-auto rounded-lg mt-4 mx-4">
          <table className="justify-center w-3/4 bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Day</th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Time</th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Itinerary</th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Remove</th>
                <th className="border-b px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Cost</th>
                <th className="border-b px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Remaining Budget</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTravelList.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50"> {/* Replace place.id with a unique identifier */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{place.day || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{place.timeTravel || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{place.placeName || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(place.placeName)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{place.cost ? `$${place.cost}` : 'Free'}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">
                    {remainingBudget >= 0 ? `$${remainingBudget}` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tripsummary;
