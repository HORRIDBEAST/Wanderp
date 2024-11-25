import { GetPlaceDetails } from '@/Service/globalAPI';
import { useEffect, useState } from 'react';
import { PHOTO_REF_URL } from '@/Service/globalAPI';
import { useDispatch } from 'react-redux';
import { addExpense } from './Redux/budgetSlice';
import PropTypes from 'prop-types';

const HotelCard = ({ hotel, trip, onSelect }) => {
    const [photolink, SetPhotoLink] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        hotel && GetPlacePhotos();
    }, [hotel]);

    const GetPlacePhotos = async () => {
        const data = { textQuery: hotel?.hotelName };
        const result = await GetPlaceDetails(data).then((r) => {
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", r.data.places[0].photos[3].name);
            SetPhotoLink(PhotoUrl);
        });
    };

    const handleHotelBook = async (hotel) => {
        let randomPrice;

        // Ensure hotel price is valid and calculate total cost
        if (typeof hotel.price === 'string') {
            const regex = /(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)/;  // Match price ranges
            const match = regex.exec(hotel.price);

            if (match) {
                const minAmount = parseFloat(match[1]);
                const maxAmount = parseFloat(match[3]);

                // Random price between min and max
                randomPrice = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
            } else {
                randomPrice = 0;
            }
        } else if (typeof hotel.price === 'number') {
            randomPrice = hotel.price;
        } else {
            randomPrice = 0;
        }

        const tripDays = trip?.userSelection?.no_of_days || 1;
        const totalCost = randomPrice * Math.max(tripDays, 1);

        const expenseItem = { ...hotel, price: totalCost };
        dispatch(addExpense({ item: expenseItem, cost: totalCost }));
        onSelect(hotel.hotelName);
    };

    return (
        <div className="mt-2">
            <img
                src={photolink ? photolink : "/place.jpeg"}
                className="rounded-md cursor-pointer h-[200px] w-full object-cover mt-3"
                alt="Hotel"
            />
            <div className="my-3 flex flex-col gap-2">
                <h2 className="font-medium">Name: 🏨 {hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">Address: 📍{hotel?.hotelAddress}</h2>
                <h2 className="text-xs text-gray-500">Rate per night: {hotel?.price} 💵</h2>
                <h2 className="text-xs text-gray-500">Rating: {hotel?.rating} ⭐</h2>
            </div>
            <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleHotelBook(hotel)}
            >
                Book
            </button>
        </div>
    );
};

HotelCard.propTypes = {
    hotel: PropTypes.shape({
        hotelName: PropTypes.string.isRequired,
        hotelAddress: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
    trip: PropTypes.shape({
        userSelection: PropTypes.shape({
            no_of_days: PropTypes.number,
        }),
    }),
    onSelect: PropTypes.func.isRequired
};

export default HotelCard;
