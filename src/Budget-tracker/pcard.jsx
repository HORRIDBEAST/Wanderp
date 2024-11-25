import { GetPlaceDetails, PHOTO_REF_URL } from '@/Service/globalAPI';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addExpense, addFreeItem } from './Redux/budgetSlice';  // Import actions

const Pcard = ({ place, onSelect }) => {
    const [photolink, setPhotoLink] = useState('/place.jpeg');  // Set a default image
    const [placeprice, setPlacePrice] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        place && getPlacePhotos();
        handleTicketPricing();
    }, [place]);

    const getPlacePhotos = async () => {
        const data = { textQuery: place?.placeName };
        const result = await GetPlaceDetails(data);
        if (result && result.data.places.length > 0 && result.data.places[0].photos.length > 3) {
            const photoUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[3].name);
            setPhotoLink(photoUrl);
        }
    };

    const handleSelect = () => {
        if (placeprice > 0) {
            dispatch(addExpense({ item: { ...place, name: place.placeName, time:place.timeTravel , day:place.day }, cost: placeprice }));
        } else {
            dispatch(addFreeItem({ item: { ...place, name: place.placeName , time:place.timeTravel,day:place.day }, cost: 0 }));
        }
        onSelect(place.placeName);
    };

    const handleTicketPricing = () => {
        const ticketPricing = place.ticketPricing || '';
        const regex = /(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)/;  // Match price ranges
        const match = regex.exec(ticketPricing);

        if (match) {
            const minAmount = parseFloat(match[1]);
            const maxAmount = parseFloat(match[3]);
            const randomPrice = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
            setPlacePrice(randomPrice);  // Set a random price between the min and max range
        } else if (ticketPricing === 'Free') {
            setPlacePrice(0);  // Free places
        }
    };

    return (
        <div>
            <div className='my-1 bg-gray-50 p-2 gap-1 border rounded-lg hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <div className='py-2 mx-3'>
                    <img src={photolink} className='w-[340px] h-[140px] rounded-xl object-cover' alt="Place" />
                </div>
                <div className='flex flex-cols-2'>
                    <h2 className='font-bold'>{place.placeName}</h2>
                    <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
                </div>
                <div className=''>
                    <h2 className='text-blue-700 text-sm'>{placeprice > 0 ? `${placeprice} USD` : 'Free'}</h2>
                    <div className='flex justify-end'>
                        <Button onClick={handleSelect} className>{placeprice > 0 ? 'Add' : 'Visit'}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pcard;

Pcard.propTypes = {
    place: PropTypes.shape({
        placeName: PropTypes.string.isRequired,
        placeDetails: PropTypes.string.isRequired,
        timeTravel: PropTypes.string.isRequired,
        day:PropTypes.string.isRequired,
        ticketPricing: PropTypes.string,  // Optional field
        rating: PropTypes.number,         // Optional field
        geoCoordinates: PropTypes.arrayOf(
            PropTypes.number.isRequired   // Latitude and Longitude (numbers)
        ).isRequired
    }).isRequired,
    onSelect: PropTypes.func.isRequired
};
