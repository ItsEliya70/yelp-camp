const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
/* Connect to the database */
mongoose.connect('mongodb://localhost:27017/yelp-camp').then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
}); 


async function seedDB() {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {  
    const randomCity = Math.floor(Math.random() * cities.length);
    const randomDescriptor = Math.floor(Math.random() * descriptors.length);
    const randomPlace = Math.floor(Math.random() * places.length);
    const camp = new Campground({
      location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      title: `${descriptors[randomDescriptor]} ${places[randomPlace]}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: Math.floor(Math.random() * 20) + 10,
      author: '68de26084a74991f3561808e'
    });
    await camp.save();
  }
}

seedDB().then(() => {
  console.log('Database seeded successfully!');
  mongoose.connection.close();
});
