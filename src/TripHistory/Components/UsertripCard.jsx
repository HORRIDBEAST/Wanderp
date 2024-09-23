import {useState} from 'react'
import { PHOTO_REF_URL,GetPlaceDetails } from '@/Service/globalAPI';
import { useEffect } from 'react';
import {  Link } from "react-router-dom";
import PropTypes from 'prop-types';

const UsertripCard = ({trip}) => {
    const [photolink,SetphotoLink]=useState([]);
 
    useEffect(()=>{
        trip&& GetPlacePhotos()
       },[trip])
       const GetPlacePhotos=async()=>{
           const data={ 
               textQuery:trip?.userSelection?.location
           }
           const result=await GetPlaceDetails(data).then(r=>{
                // console.log(r.data.places[0].photos[3].name);
                const PhotoUrl=PHOTO_REF_URL.replace("{NAME}",r.data.places[0].photos[3].name)
                SetphotoLink(PhotoUrl);
           })
       }
  return (
    <Link to={'/see-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all hover:shadow-sm' >
        <img src={photolink?photolink :"/place.jpeg"} alt="places" className='object-cover rounded-xl h-[220px] w-full'/>
        <div>
            <h2>{trip.userSelection?.location }</h2>
            <h2 className='text-sm text-gray-500'>{trip.userSelection?.no_of_days} Days trip with {trip.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  ) 
}


UsertripCard.propTypes = {
    trip: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userSelection: PropTypes.shape({
        location: PropTypes.string.isRequired,
        no_of_days: PropTypes.number.isRequired,
        budget: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  };
  
  export default UsertripCard;