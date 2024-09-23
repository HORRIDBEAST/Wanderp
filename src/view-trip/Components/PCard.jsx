import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { FaLocationDot } from "react-icons/fa6";
import { GetPlaceDetails,PHOTO_REF_URL } from '@/Service/globalAPI';
import PropTypes from 'prop-types';

const PlaceCard = ({ place }) => {
  const [photolink, setPhotoLink] = useState('/place.jpeg');  // Set a default image

  useEffect(() => {
    place && getPlacePhotos();
  }, [place]);

  const getPlacePhotos = async () => {
    const data = {
      textQuery: place?.placeName
    };
    const result = await GetPlaceDetails(data);
    if (result && result.data.places.length > 0 && result.data.places[0].photos.length > 3) {
      const photoUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[3].name);
      setPhotoLink(photoUrl);
    }
  };

  return (
    <div>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName},${place?.geoCoordinates[0]},${place?.geoCoordinates[1]}`}
        target='_blank'
      >
        <div className='my-1 bg-gray-50 p-2 gap-1 border rounded-lg flex flex-cols-2 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
          <div className='py-2 mx-3'>
            <img src={photolink} className='w-[340px] h-[140px] rounded-xl object-cover' alt="Place" />
          </div>
          <div>
            
            <h2 className='font-bold'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='text-blue-700 text-sm'>{place.ticketPricing}</h2>
            <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
          </div>
          <div className='mt-36'>
            <Button>Add</Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaceCard;

PlaceCard.propTypes = {
    place: PropTypes.shape({
      placeName: PropTypes.string.isRequired,
      placeDetails: PropTypes.string.isRequired,
      timeTravel: PropTypes.string.isRequired,
      ticketPricing: PropTypes.string,       // Optional field
      rating: PropTypes.number,              // Optional field
      geoCoordinates: PropTypes.arrayOf(
        PropTypes.number.isRequired          // Latitude and Longitude (numbers)
      ).isRequired
    }).isRequired
  };