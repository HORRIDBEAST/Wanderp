import  { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';  // Assuming you're using react-router for linking
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { GetPlaceDetails ,PHOTO_REF_URL} from '@/Service/globalAPI';

const HCard = ({ hotel }) => {
  const [photolink, SetPhotoLink] = useState(false);
  useEffect(()=>{
    hotel&& GetPlacePhotos()
   },[hotel])
   const GetPlacePhotos=async()=>{
       const data={ 
           textQuery:hotel?.hotelName
       }
       // eslint-disable-next-line no-unused-vars
       const result=await GetPlaceDetails(data).then(r=>{
            console.log(r.data.places[0].photos[3].name);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',r.data.places[0].photos[3].name)
            SetPhotoLink(PhotoUrl);
       })
   }
  return (
    <div>
      <div className='hover:scale-110 transition-all'>
        <img
          src={photolink ? photolink : "/place.jpeg"}
          className='rounded-md cursor-pointer h-[200px] w-full object-cover'
          alt="Hotel"
        />
        <div className='my-3 flex flex-col gap-2'>
          <h2 className='font-medium'>Name: 🏨 {hotel?.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>Address: 📍{hotel?.hotelAddress}</h2>
          <h2 className='text-xs text-gray-500'>Rate per night: {hotel?.price} 💵</h2>
          <h2 className='text-xs text-gray-500'>Rating: {hotel?.rating} ⭐</h2>
        </div>
        <div className='flex justify-between items-start'>
          <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`} target='_blank'>
            <Button>Locate</Button>
          </Link>
          <Button>Book</Button>
        </div>
      </div>
    </div>
  );
}

HCard.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    hotelAddress: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired
};

export default HCard;
