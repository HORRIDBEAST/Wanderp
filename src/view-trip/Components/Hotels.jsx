import React from 'react'
import PropTypes from 'prop-types';
import HCard from './HCard'; // Assuming you have a HCard component for each hotel

const Hotels = ({ trip }) => {
  return (
    <div>
      Hotel Recommendations 
      <div className='grid mt-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 '>
        { trip?.tripData?.hotels?.map((hotel, index) => (
           <HCard hotel={hotel} key={index} />
        // <h2>{hotel.hotelName}</h2>
        // <div key={index} className=''> 
        //     <img src="/place.jpeg" alt="My hotel" className='rounded-xl'/>
        //     <div className='my-2'>
        //         <h2 className='font-medium'>{hotel.hotelName}</h2>
        //     </div>
        //     </div>
        ))}
      </div>
    </div>
  )
}

Hotels.propTypes = {
  trip: PropTypes.shape({
    userSelection: PropTypes.shape({
      location: PropTypes.string,
      no_of_days: PropTypes.number,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      people: PropTypes.string,
      budget: PropTypes.string,
    }),
    tripData: PropTypes.shape({
      hotels: PropTypes.arrayOf(
        PropTypes.shape({
          hotelName: PropTypes.string.isRequired,
          hotelAddress: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          rating: PropTypes.number.isRequired,
        })
      )
    })
  })
};

export default Hotels;
 