import PropTypes from 'prop-types';
import { IoIosShareAlt } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/Service/globalAPI';
import { useEffect,useState } from 'react';
import { PHOTO_REF_URL } from '@/Service/globalAPI';
const Info = ({ trip }) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [photolink,SetphotoLink]=useState()
    const findDay = (dateString) => {
        const date = new Date(dateString);
        const dayIndex = date.getDay(); // getDay returns a number from 0 to 6
        return daysOfWeek[dayIndex];
    };

    const getPeopleEmoji = (people) => {
        switch (people) {
            case 'Solo Traveler':
                return '🧳';
            case 'Couple':
                return '👫';
            case 'Small Family':
                return '👨‍👩‍👦';
            case 'Group of Friends':
                return '👯‍♂️';
            case 'Large Family or Group':
                return '👨‍👩‍👧‍👦';
            case 'Mass Bookings or School / College Trips':
                return '🏫';
            default:
                return '';
        }
    };

    const getBudgetEmoji = (budget) => {
        switch (budget) {
            case 'Budget':
                return '🪙';
            case 'Economy':
                return '💸';
            case 'Premium':
                return '🌟';
            case 'Luxury':
                return '💎';
            default:
                return '';
        }
    };

    useEffect(()=>{
        trip&& GetPlacePhotos()
       },[trip])
       const GetPlacePhotos=async()=>{
           const data={ 
               textQuery:trip?.userSelection?.location
           }
           // eslint-disable-next-line no-unused-vars
           const result=await GetPlaceDetails(data).then(r=>{
                console.log(r.data.places[0].photos[3].name);
                const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',r.data.places[0].photos[3].name)
                SetphotoLink(PhotoUrl);
           })
       }

    return (
        <div className=''>
            
            <img src={photolink}  className='h-[400px] w-full object-cover m-6 ' alt='my-img'/>         
               <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h1 className='font-bold text-3xl'>{trip?.userSelection?.location}</h1>
                    <div className='flex gap-4'>  
                        <h2 className='p-1 px-3 bg-green-300 text-l md:text-md rounded-full'>
                            Number of trip days are {trip?.userSelection?.no_of_days}{' '}
                        </h2>
                        <h2 className='p-1 px-3 bg-green-300 text-l md:text-md rounded-full'>
                            scheduled from {trip?.userSelection?.start_date}{' '}
                            {findDay(trip?.userSelection?.start_date)} to{' '}
                            {trip?.userSelection?.end_date} {findDay(trip?.userSelection?.end_date)} 
                        </h2>
                        <h2 className='p-1 px-3 bg-green-300 text-l md:text-md rounded-full'>
                            {getPeopleEmoji(trip?.userSelection?.people)}Number of travellers  are {trip?.userSelection?.people}
                        </h2>
                        <h2 className='p-1 px-3 bg-green-300 text-l md:text-md rounded-full'>
                            {getBudgetEmoji(trip?.userSelection?.budget)}{trip?.userSelection?.budget} Budget
                        </h2>
                    </div>
                </div>
                <Button><IoIosShareAlt /></Button>
            </div>
        </div>
    );
};

// PropTypes validation
Info.propTypes = {
    trip: PropTypes.shape({
        userSelection: PropTypes.shape({
            location: PropTypes.string,
            no_of_days: PropTypes.number,
            start_date: PropTypes.string,
            end_date: PropTypes.string,
            people: PropTypes.string,
            budget: PropTypes.string,
        }),
    }),
};

export default Info;
