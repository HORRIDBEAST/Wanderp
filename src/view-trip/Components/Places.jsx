import PropTypes from 'prop-types';
import PlaceCard from './PCard';  // Ensure PlaceCard is imported

const VisitPlaces = ({ trip }) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const findDay = (dateString) => {
        const date = new Date(dateString);
        const dayIndex = date.getDay(); // getDay returns a number from 0 to 6
        return daysOfWeek[dayIndex];
    };

  return (
    <div className='mt-6'>
      <div className='font-bold text-xl mb-2'>Places to Visit</div>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => {
          const dayCount = index + 1; // Increment day count based on index
          return (
            <div key={index}>
              <h2 className='font-medium text-xl mt-4'>
                Day {dayCount} {findDay(item?.day)} Date {item?.day}
              </h2>
              <div className='grid md:grid-cols-2 gap-5 mt-3'>
                {item.plan?.map((place, placeIndex) => (
                    <div key={placeIndex} >
                    <h2 className='font-medium text-sm text-orange-600'>{place.timeTravel}</h2>
                  <PlaceCard place={place} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

VisitPlaces.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      itinerary: PropTypes.arrayOf(
        PropTypes.shape({
          day: PropTypes.string.isRequired, // Assuming day is a date string
          plan: PropTypes.arrayOf(
            PropTypes.shape({
              placeName: PropTypes.string.isRequired,
              placeDetails: PropTypes.string.isRequired,
              timeTravel: PropTypes.string.isRequired,
              ticketPricing: PropTypes.string,
              rating: PropTypes.number,
              geoCoordinates: PropTypes.arrayOf(PropTypes.number)
            })
          ).isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default VisitPlaces;
