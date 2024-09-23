export const SelectTravelGroupOptions = [
    {
        id: 1,
        title: 'Solo Traveler',
        desc: "Traveling alone and enjoying the freedom",
        icon: '🧳',
        people: '1',
    },
    {
        id: 2,
        title: 'Couple',
        desc: "A pair enjoying a romantic getaway",
        icon: '👫',
        people: '2',
    },
    {
        id: 3,
        title: 'Small Family',
        desc: "A family of three to five members",
        icon: '👨‍👩‍👦',
        people: '3 to 5',
    },
    {
        id: 4,
        title: 'Group of Friends',
        desc: "A lively group of six to ten friends",
        icon: '👯‍♂️',
        people: '6 to 10',
    },
    {
        id: 5,
        title: 'Large Family or Group',
        desc: "A larger group of ten or more people",
        icon: '👨‍👩‍👧‍👦',
        people: '10+',
        discount: '12%',
    },
    {
        id: 6,
        title: 'Mass Bookings or School / College Trips',
        desc: "Picnics planned for students",
        icon: '🏫',
        people: '30+',
        discount: '15%',
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: "Maximize savings while traveling",
        icon: '🪙',
        
    },
    {
        id: 2,
        title: 'Economy',
        desc: "Affordable yet comfortable",
        icon: '💸',
        
    },
    {
        id: 3,
        title: 'Premium',
        desc: "Enjoy added comforts and conveniences",
        icon: '🌟',
        discount: '10%',
    },
    {
        id: 4,
        title: 'Luxury',
        desc: "Experience the finest with no cost constraints",
        icon: '💎',
        discount: '15%',
    },
];

export const AI_PROMPT = 'Generate Travel Plan for Location : {location} for {totalDays} Days starting from {start_date} upto {end_date} for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName,Hotel address,Price, hotel image url,geo coordinates,rating,descriptions and suggest itinerary with placeName,Place Details,Place Image Url, Geo Coordinates,ticket Pricing,rating,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format and ensure a total of at least five activities are suggested for each day, allowing flexibility with alternatives.'
