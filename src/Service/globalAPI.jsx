import axios from "axios";

// Define the base URL for the API request
const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id',
            'places.rating',
                'places.regularOpeningHours',
                'places.currentOpeningHours',
                'places.userRatingCount',
                'places.priceLevel',
                'places.websiteUri',
                'places.reviews',


        ]
    }
};

// Export a function to get place details using axios
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
