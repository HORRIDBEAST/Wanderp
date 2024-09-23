/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */


import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = 'AIzaSyByG4Fq4E3RVhdET0wsZIidrEYqALfK7AY';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
   export  const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with\nHotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place\nDetails, Place Image Urli, Geo Coordinates, ticket Pricing,,start date , end date, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## Las Vegas Budget Trip for a Couple (3 Days)\n\nThis itinerary focuses on free or low-cost activities, maximizing your Las Vegas experience without breaking the bank.\n\n**Hotel Options:**\n\n| Hotel Name | Hotel Address | Price (approx.) | Hotel Image URL | Geo Coordinates | Rating | Description |\n|---|---|---|---|---|---|---|\n| **The Orleans Hotel & Casino** | 4500 W. Tropicana Ave., Las Vegas, NV 89103 | $50-100/night | ![Orleans Hotel](https://www.orleanscasino.com/media/images/orleans-exterior-day.jpg) | 36.1031, -115.1924 | 4/5 | A classic Vegas hotel with a casino, pool, and multiple dining options. |\n| **Circus Circus Hotel & Casino** | 2880 Las Vegas Blvd. S., Las Vegas, NV 89109 | $40-80/night | ![Circus Circus](https://www.circuscircus.com/media/images/circus-circus-exterior.jpg) | 36.1271, -115.1728 | 3.5/5 | Affordable option with a fun circus theme, family-friendly entertainment, and a large casino. |\n| **Golden Nugget Hotel & Casino** | 129 E Fremont St., Las Vegas, NV 89101 | $60-120/night | ![Golden Nugget](https://www.goldennugget.com/media/images/golden-nugget-exterior.jpg) | 36.1696, -115.1414 | 4/5 | Located in the heart of Fremont Street, offering a lively atmosphere with a casino, pool, and unique attractions like the Shark Tank. |\n| **The D Las Vegas** | 301 Fremont St., Las Vegas, NV 89101 | $40-70/night | ![The D](https://www.thedlasvegas.com/media/images/thed-exterior.jpg) | 36.1699, -115.1411 | 4/5 | Modern hotel with a retro vibe, located in Fremont Street, offering a casino, rooftop pool, and an arcade. |\n\n**Itinerary:**\n\n**Day 1: Fremont Street Experience & Free Entertainment**\n\n* **Morning (9:00 AM - 12:00 PM):** Explore Fremont Street Experience. Walk the pedestrian-friendly street, admire the vibrant lights, and enjoy the free street performers.\n    * **Place Name:** Fremont Street Experience \n    * **Place Details:** A vibrant pedestrian mall in Downtown Las Vegas, known for its light shows, free entertainment, and historic architecture.\n    * **Place Image URL:** ![Fremont Street Experience](https://www.fremontstreetexperience.com/images/freemont-street-experience-header.jpg)\n    * **Geo Coordinates:** 36.1696, -115.1414\n    * **Ticket Pricing:** Free\n    * **Start Date:** 9:00 AM\n    * **End Date:** 12:00 PM\n    * **Rating:** 4.5/5\n* **Afternoon (12:00 PM - 3:00 PM):** Grab lunch at a cheap eatery on Fremont Street. Try a local favorite like a burger at \"Heart Attack Grill\" (known for its outrageous portions) or a pizza at \"Pizza Rock\" (for its unique toppings and atmosphere).\n    * **Place Name:** Heart Attack Grill/Pizza Rock\n    * **Place Details:**  Local restaurants in Fremont Street known for their unique offerings and affordability.\n    * **Place Image URL:** ![Heart Attack Grill](https://www.heartattackgrill.com/images/HeartAttackGrill_Main.jpg) / ![Pizza Rock](https://www.pizzarocklv.com/images/pizza-rock-exterior.jpg) \n    * **Geo Coordinates:** 36.1696, -115.1414\n    * **Ticket Pricing:** Varies\n    * **Start Date:** 12:00 PM\n    * **End Date:** 3:00 PM\n    * **Rating:** 4/5\n* **Evening (3:00 PM - 10:00 PM):**  Head to the Golden Nugget for their free \"Shark Tank\" viewing. Afterwards, enjoy a free \"Fountains of Bellagio\" show at the Bellagio. \n    * **Place Name:** Golden Nugget Shark Tank/ Fountains of Bellagio\n    * **Place Details:**  A large aquarium filled with sharks at the Golden Nugget. Bellagio's renowned fountain show featuring choreographed water, lights, and music.\n    * **Place Image URL:** ![Golden Nugget Shark Tank](https://www.goldennugget.com/media/images/shark-tank-exterior.jpg) / ![Fountains of Bellagio](https://www.bellagio.com/media/images/bellagio-fountains.jpg) \n    * **Geo Coordinates:** 36.1696, -115.1414 / 36.1148, -115.1731\n    * **Ticket Pricing:** Free\n    * **Start Date:** 3:00 PM\n    * **End Date:** 10:00 PM\n    * **Rating:** 4.5/5\n\n**Day 2: Free Activities on the Strip & Downtown**\n\n* **Morning (9:00 AM - 12:00 PM):** Enjoy a free walking tour of the Strip. Learn about the history of Las Vegas and its iconic landmarks.\n    * **Place Name:** Las Vegas Strip Walking Tour\n    * **Place Details:**  A self-guided walking tour exploring the history and landmarks of the Las Vegas Strip.\n    * **Place Image URL:** ![Las Vegas Strip](https://www.visitlasvegas.com/media/images/las-vegas-strip.jpg)\n    * **Geo Coordinates:** 36.1005, -115.1754\n    * **Ticket Pricing:** Free\n    * **Start Date:** 9:00 AM\n    * **End Date:** 12:00 PM\n    * **Rating:** 4/5\n* **Afternoon (12:00 PM - 3:00 PM):** Have a picnic lunch at the \"Secret Garden\" at the Mirage. Relax and enjoy the beautiful botanical gardens and waterfalls. \n    * **Place Name:** The Secret Garden at the Mirage\n    * **Place Details:**  A botanical garden with waterfalls, sculptures, and exotic plants at the Mirage Hotel.\n    * **Place Image URL:** ![The Secret Garden](https://www.mirage.com/media/images/secret-garden-exterior.jpg)\n    * **Geo Coordinates:** 36.1148, -115.1731\n    * **Ticket Pricing:** Free\n    * **Start Date:** 12:00 PM\n    * **End Date:** 3:00 PM\n    * **Rating:** 4/5\n* **Evening (3:00 PM - 10:00 PM):** Watch the free \"Volcano\" show at The Mirage and enjoy the vibrant atmosphere. Afterwards, enjoy the free \"Neon Museum\" tour, a unique collection of vintage neon signs.\n    * **Place Name:** The Volcano at The Mirage/ Neon Museum\n    * **Place Details:**  A nightly fire and light show at The Mirage. A museum showcasing vintage neon signs from Las Vegas history.\n    * **Place Image URL:** ![The Volcano](https://www.mirage.com/media/images/volcano-exterior.jpg) / ![Neon Museum](https://www.neonmuseum.org/media/images/neon-museum-exterior.jpg)\n    * **Geo Coordinates:** 36.1148, -115.1731 / 36.1703, -115.1355\n    * **Ticket Pricing:** Free\n    * **Start Date:** 3:00 PM\n    * **End Date:** 10:00 PM\n    * **Rating:** 4/5\n\n**Day 3: Exploring the Arts & Local Flavors**\n\n* **Morning (9:00 AM - 12:00 PM):** Visit the \"Arts District\" and explore the vibrant street art, galleries, and local shops.\n    * **Place Name:** Arts District\n    * **Place Details:**  An area in Downtown Las Vegas known for its street art, galleries, and independent businesses.\n    * **Place Image URL:** ![Arts District](https://www.artsdistrictlv.org/media/images/arts-district-exterior.jpg)\n    * **Geo Coordinates:** 36.1644, -115.1341\n    * **Ticket Pricing:** Free\n    * **Start Date:** 9:00 AM\n    * **End Date:** 12:00 PM\n    * **Rating:** 4/5\n* **Afternoon (12:00 PM - 3:00 PM):**  Enjoy a delicious and affordable lunch at a food truck park like \"The Park\" or \"Downtown Container Park\".\n    * **Place Name:** The Park/ Downtown Container Park\n    * **Place Details:**  Outdoor food truck parks with a variety of cuisines and seating options.\n    * **Place Image URL:** ![The Park](https://www.theparklasvegas.com/media/images/the-park-exterior.jpg) / ![Downtown Container Park](https://www.downtowncontainerpark.com/media/images/downtown-container-park-exterior.jpg) \n    * **Geo Coordinates:** 36.1644, -115.1341 / 36.1672, -115.1401\n    * **Ticket Pricing:** Varies\n    * **Start Date:** 12:00 PM\n    * **End Date:** 3:00 PM\n    * **Rating:** 4/5\n* **Evening (3:00 PM - 10:00 PM):** Explore the \"Las Vegas Natural History Museum\" for a glimpse into the city's geological and natural history.\n    * **Place Name:** Las Vegas Natural History Museum\n    * **Place Details:**  A museum showcasing the natural history of the Las Vegas Valley, including fossils, dinosaur exhibits, and artifacts.\n    * **Place Image URL:** ![Las Vegas Natural History Museum](https://www.lvnhm.org/media/images/las-vegas-natural-history-museum-exterior.jpg)\n    * **Geo Coordinates:** 36.1520, -115.1460\n    * **Ticket Pricing:** $12-15 per adult\n    * **Start Date:** 3:00 PM\n    * **End Date:** 10:00 PM\n    * **Rating:** 4/5\n\nThis itinerary allows you to experience the best of Las Vegas on a budget, with a mix of free entertainment, cultural attractions, and delicious food options. \n\n**Remember to:**\n\n* **Pack light:** You'll be walking a lot!\n* **Bring water:** Las Vegas can get very hot.\n* **Be mindful of your budget:** Stick to your spending plan.\n* **Take advantage of free activities:** There are plenty of free things to do in Las Vegas.\n* **Have fun!** Las Vegas is a city of excitement and possibilities.\n\nThis is just a sample itinerary, feel free to adjust it to your interests and preferences! You can also find additional free activities and discounts online."},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with\nHotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place\nDetails, Place Image Urli, Geo Coordinates, ticket Pricing,,start date , end date, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## Las Vegas Budget Trip for a Couple (3 Days) - JSON Format\n\n```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The Orleans Hotel & Casino\",\n      \"hotelAddress\": \"4500 W. Tropicana Ave., Las Vegas, NV 89103\",\n      \"price\": \"$50-100/night\",\n      \"hotelImageURL\": \"https://www.orleanscasino.com/media/images/orleans-exterior-day.jpg\",\n      \"geoCoordinates\": [36.1031, -115.1924],\n      \"rating\": 4,\n      \"description\": \"A classic Vegas hotel with a casino, pool, and multiple dining options.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd. S., Las Vegas, NV 89109\",\n      \"price\": \"$40-80/night\",\n      \"hotelImageURL\": \"https://www.circuscircus.com/media/images/circus-circus-exterior.jpg\",\n      \"geoCoordinates\": [36.1271, -115.1728],\n      \"rating\": 3.5,\n      \"description\": \"Affordable option with a fun circus theme, family-friendly entertainment, and a large casino.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Hotel & Casino\",\n      \"hotelAddress\": \"129 E Fremont St., Las Vegas, NV 89101\",\n      \"price\": \"$60-120/night\",\n      \"hotelImageURL\": \"https://www.goldennugget.com/media/images/golden-nugget-exterior.jpg\",\n      \"geoCoordinates\": [36.1696, -115.1414],\n      \"rating\": 4,\n      \"description\": \"Located in the heart of Fremont Street, offering a lively atmosphere with a casino, pool, and unique attractions like the Shark Tank.\"\n    },\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont St., Las Vegas, NV 89101\",\n      \"price\": \"$40-70/night\",\n      \"hotelImageURL\": \"https://www.thedlasvegas.com/media/images/thed-exterior.jpg\",\n      \"geoCoordinates\": [36.1699, -115.1411],\n      \"rating\": 4,\n      \"description\": \"Modern hotel with a retro vibe, located in Fremont Street, offering a casino, rooftop pool, and an arcade.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A vibrant pedestrian mall in Downtown Las Vegas, known for its light shows, free entertainment, and historic architecture.\",\n          \"placeImageURL\": \"https://www.fremontstreetexperience.com/images/freemont-street-experience-header.jpg\",\n          \"geoCoordinates\": [36.1696, -115.1414],\n          \"ticketPricing\": \"Free\",\n          \"startDate\": \"9:00 AM\",\n          \"endDate\": \"12:00 PM\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Morning\"\n        },\n        {\n          \"placeName\": \"Heart Attack Grill/Pizza Rock\",\n          \"placeDetails\": \"Local restaurants in Fremont Street known for their unique offerings and affordability.\",\n          \"placeImageURL\": \"https://www.heartattackgrill.com/images/HeartAttackGrill_Main.jpg / https://www.pizzarocklv.com/images/pizza-rock-exterior.jpg\",\n          \"geoCoordinates\": [36.1696, -115.1414],\n          \"ticketPricing\": \"Varies\",\n          \"startDate\": \"12:00 PM\",\n          \"endDate\": \"3:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Golden Nugget Shark Tank/ Fountains of Bellagio\",\n          \"placeDetails\": \"A large aquarium filled with sharks at the Golden Nugget. Bellagio's renowned fountain show featuring choreographed water, lights, and music.\",\n          \"placeImageURL\": \"https://www.goldennugget.com/media/images/shark-tank-exterior.jpg / https://www.bellagio.com/media/images/bellagio-fountains.jpg\",\n          \"geoCoordinates\": [36.1696, -115.1414 / 36.1148, -115.1731],\n          \"ticketPricing\": \"Free\",\n          \"startDate\": \"3:00 PM\",\n          \"endDate\": \"10:00 PM\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Las Vegas Strip Walking Tour\",\n          \"placeDetails\": \"A self-guided walking tour exploring the history and landmarks of the Las Vegas Strip.\",\n          \"placeImageURL\": \"https://www.visitlasvegas.com/media/images/las-vegas-strip.jpg\",\n          \"geoCoordinates\": [36.1005, -115.1754],\n          \"ticketPricing\": \"Free\",\n          \"startDate\": \"9:00 AM\",\n          \"endDate\": \"12:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The Secret Garden at the Mirage\",\n          \"placeDetails\": \"A botanical garden with waterfalls, sculptures, and exotic plants at the Mirage Hotel.\",\n          \"placeImageURL\": \"https://www.mirage.com/media/images/secret-garden-exterior.jpg\",\n          \"geoCoordinates\": [36.1148, -115.1731],\n          \"ticketPricing\": \"Free\",\n          \"startDate\": \"12:00 PM\",\n          \"endDate\": \"3:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"The Volcano at The Mirage/ Neon Museum\",\n          \"placeDetails\": \"A nightly fire and light show at The Mirage. A museum showcasing vintage neon signs from Las Vegas history.\",\n          \"placeImageURL\": \"https://www.mirage.com/media/images/volcano-exterior.jpg / https://www.neonmuseum.org/media/images/neon-museum-exterior.jpg\",\n          \"geoCoordinates\": [36.1148, -115.1731 / 36.1703, -115.1355],\n          \"ticketPricing\": \"Free\",\n          \"startDate\": \"3:00 PM\",\n          \"endDate\": \"10:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"Arts District\",\n          \"placeDetails\": \"An area in Downtown Las Vegas known for its street art, galleries, and independent businesses.\",\n          \"placeImageURL\": \"https://www.artsdistrictlv.org/media/images/arts-district-exterior.jpg\",\n          \"geoCoordinates\": [36.1644, -115.1341],\n          \"ticketPricing\": \"Free\",\n          \"startDate\": \"9:00 AM\",\n          \"endDate\": \"12:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Morning\"\n        },\n        {\n          \"placeName\": \"The Park/ Downtown Container Park\",\n          \"placeDetails\": \"Outdoor food truck parks with a variety of cuisines and seating options.\",\n          \"placeImageURL\": \"https://www.theparklasvegas.com/media/images/the-park-exterior.jpg / https://www.downtowncontainerpark.com/media/images/downtown-container-park-exterior.jpg\",\n          \"geoCoordinates\": [36.1644, -115.1341 / 36.1672, -115.1401],\n          \"ticketPricing\": \"Varies\",\n          \"startDate\": \"12:00 PM\",\n          \"endDate\": \"3:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Afternoon\"\n        },\n        {\n          \"placeName\": \"Las Vegas Natural History Museum\",\n          \"placeDetails\": \"A museum showcasing the natural history of the Las Vegas Valley, including fossils, dinosaur exhibits, and artifacts.\",\n          \"placeImageURL\": \"https://www.lvnhm.org/media/images/las-vegas-natural-history-museum-exterior.jpg\",\n          \"geoCoordinates\": [36.1520, -115.1460],\n          \"ticketPricing\": \"$12-15 per adult\",\n          \"startDate\": \"3:00 PM\",\n          \"endDate\": \"10:00 PM\",\n          \"rating\": 4,\n          \"timeTravel\": \"Evening\"\n        }\n      ]\n    }\n  ]\n}\n```\n\nThis JSON format provides a structured way to organize the hotel options and itinerary, making it easier to use and share. It includes all the necessary information, such as prices, image URLs, geo coordinates, and ratings, for each location. \n\nRemember, this is a sample itinerary, and you can customize it based on your interests and preferences. \n"},
          ],
        },
      ],
    });
  

  