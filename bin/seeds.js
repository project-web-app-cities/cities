const { urlencoded } = require("express");
const mongoose = require("mongoose");
const FreeStuff = require("../models/FreeStuff.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/myproject";

const freeStuffs = [
  {
    description: "The British Museum, boring but free!",
    category: "Museum",
    city: "London",
    country: "United-Kingdom"
  },
  {
    description: "100 Montaditos, disgusting but cheap beer!",
    category: "Bar",
    city: "Madrid",
    country: "Spain"
  },
  {
    description: "Thursday nights free entrance at Ivy club, Australia's biggest nightclub",
    category: "Club",
    city: "Sydney",
    country: "Australia"
  },
  {
    description: "Enjoy the (free) view from Bunkers El Carmel",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Join a free walking tour of the city, these tours are donation-based. One of the many companies offering them is Runner Bean Tours",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Enter the famous Sagrada Familia for free on Sunday morning (the mass starts at 9am and allows you entrance cost-free",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Catalonia’s National Art Museum. By far, the best Art collection in Barcelona and one of the best in Europe for Medieval Art. Free every Saturday from 3 pm and the first Sunday of the month until closing time (3 pm).",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Wander around a local food market such as the mercado de la Boqueria",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Relax at one of the city beaches",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Have a picnic at the beautiful Parc de la Ciutadella",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Go to the beach! Sydney counts no less than 100 of them to choose from",
    category: "Other",
    city: "Barcelona",
    country: "Spain"
  },
  {
    description: "Wander in the Royal Botanical Gardens gathering tons of flowers species. Don't miss the view from Mrs. Macquaries chair, one of the best views of the harbour and Sydney's Opera House",
    category: "Other",
    city: "Sydney",
    country: "Australia"
  },
  {
    description: "Hike from Bondi Beach to Coogee Beach",
    category: "Other",
    city: "Sydney",
    country: "Australia"
  },
  {
    description: "Visit one of the free museums the city has on offer. Amongst them: Museum of Contemporary Art (Circular Quay), Australian National Maritime Museum (Darling Harbour), Art Gallery of NSW (Domain)",
    category: "Museum",
    city: "Sydney",
    country: "Australia"
  },
  {
    description: "Spend a Day in the Blue Mountains, you'll just have to pay for the train ride :)",
    category: "Other",
    city: "Sydney",
    country: "Australia"
  },
  {
    description: "Watch the Eiffel Tower light show from Parc du Champ de Mars",
    category: "Other",
    city: "Paris",
    country: "France"
  },
  {
    description: "Go window-shopping in Marché aux Puces de St-Ouen",
    category: "Other",
    city: "Paris",
    country: "France"
  },
  {
    description: "Enter Basilique du Sacré-Coeur for free, there's a charge to ascend into the dome or explore the crypt, but visiting the basilica itself is free.",
    category: "Other",
    city: "Paris",
    country: "France"
  },
  {
    description: "Go to Paris' free festivals. The city has an array of exciting, free festivals on offer throughout the year. Stay up all night viewing eclectic art instillations in quirky citys during La Nuit Blanche (October), see pros and rising stars perform impromptu sets throughout the city for Fête de la Musique (June) or catch the grand military parade (and accompanying revelry) along ave des Champs-Élysées that kick-starts Bastille Day (July).",
    category: "Events",
    city: "Paris",
    country: "France"
  },
  {
    description: "Walk along the east-side gallery",
    category: "Other",
    city: "Berlin",
    country: "Germany"
  },
  {
    description: "Enjoy the free view from the Reichstag dome",
    category: "Other",
    city: "Berlin",
    country: "Germany"
  },
  {
    description: "Pay your respect at the Holocaust memorial",
    category: "Other",
    city: "Berlin",
    country: "Germany"
  },
  {
    description: "Visit one of the free museums such as the Topography of Terror, the Anti-War Museum and the German-Russian museum",
    category: "Museum",
    city: "Berlin",
    country: "Germany"
  },
  {
    description: "Hike up the Hollywood sign",
    category: "Other",
    city: "Los Angeles",
    country: "USA"
  },
  {
    description: "Stroll along the famous Hollywood Boulevard",
    category: "Other",
    city: "Los Angeles",
    country: "USA"
  },
  {
    description: "Tour the celebrities properties in Bervelly Hills",
    category: "Other",
    city: "Los Angeles",
    country: "USA"
  },
  {
    description: "The Broad Museum, free with reservation, including Infinity Mirror Room. Timed tickets required.",
    category: "Museum",
    city: "Los Angeles",
    country: "USA"
  },
  {
    description: "The Golden Gate Bridge. You haven't been to San Francisco until you're strolled across this massive landmark. Luckily for you, the city's biggest icon is always free for pedestrians. With breathtaking views of the city, as well as Alcatraz and Angel Island, this one-of-a-kind experience should top your list.",
    category: "Other",
    city: "San Fransisco",
    country: "USA"
  },
  {
    description: "San Francisco Cable Car Museum. While the historic cable cars of San Francisco are not running at this time, it's free to visit the Cable Car Museum at the corner of Mason and Washington Streets. Not only can you learn the history of the cable cars, but also you can see how the entire system runs. This facility isn't just a museum; it's a crucial and operational part of the city's transit system.",
    category: "Museum",
    city: "San Francisco",
    country: "USA"
  },
  {
    description: "The Broad Museum, free with reservation, including Infinity Mirror Room. Timed tickets required.",
    category: "Museum",
    city: "Los Angeles",
    country: "USA"
  },
  {
    description: "Free meditation classes at Wat Mahathat",
    category: "Other",
    city: "Bangkok",
    country: "Thailand"
  },
  {
    description: "the stunning Asakusa Culture and Tourist Information Center designed by Kengo Kuma, located across the street from another visitor magnet, Sensoji Temple’s Kaminarimon gate. Besides offering free guided tours, currency exchange and an information desk, the eight-storey building also sports a (covered) rooftop observation deck, which offers the best view of Sensoji without having to jostle through the crowds.",
    category: "Museum",
    city: "Tokyo",
    country: "Japan"
  },
  {
    description: "Tokyo Metropolitan Government Building, access free to the 45th floor of the building",
    category: "Other",
    city: "Tokyo",
    country: "Japan"
  },
  {
    description: "Explore the Shanghai Museum",
    category: "Museum",
    city: "Shanghai",
    country: "China"
  },
  {
    description: "Watch the skyline at The Bund Waterfront",
    category: "Other",
    city: "Shanghai",
    country: "China"
  },
  {
    description: "Auckland’s landscape is dotted with 48 volcanic cones, all dormant we should add, and all great spots for 360-degree views of Auckland. Maungawhau (Mount Eden) is the city’s highest natural point and its 50-metre deep crater and surrounds hold an important place in Māori history. Head to Cornwall Park and Maungakiekie (One Tree Hill), one of the largest former Māori settlement complexes in New Zealand or walk to the top of Takarunga (Mt Victoria) or Maungauika (North Head) in Devonport.",
    category: "Other",
    city: "Auckland",
    country: "New-Zealand"
  },
  {
    description: "The Vatican Museums are not free every day, but on the last Sunday of each month, they are free to the public",
    category: "Museum",
    city: "Rome",
    country: "Italy"
  },
  {
    description: "Admire the famous Trevi Fountain",
    category: "Other",
    city: "Rome",
    country: "Italy"
  },  
  {
    description: "Visit the Coffee Museum in Dubai ",
    category: "Museum",
    city: "Dubai",
    country: "UAE"
  },
  {
    description: "Wander through the Al Fahidi historic district",
    category: "Other",
    city: "Dubai",
    country: "UAE"
  },
  {
    description: "Take a day to explore The Dubai Mall",
    category: "Other",
    city: "Dubai",
    country: "UAE"
  },
  {
    description: "Take a free tour of the Bur Dubai Grand Mosque",
    category: "Other",
    city: "Dubai",
    country: "UAE"
  },
];

mongoose
  .connect("mongodb://127.0.0.1/myproject")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return FreeStuff.deleteMany();
  })
  .then((response) => {
    console.log(response);

    return FreeStuff.create(freeStuffs);
  })
  .catch((err) => console.error("Error... ", err))
  .then((freeStuffFromDB) => {
    console.log("Number of freestuffs created: ", freeStuffFromDB.length);

    console.log(freeStuffFromDB);

    mongoose.connection.close();
  })
  .catch((err) => console.error("Error... ", err));
