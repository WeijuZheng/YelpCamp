const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fb6f6717de2ef499ce24da4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure quod, eligendi deserunt numquam quaerat, quisquam quis sed eius quos fugiat cumque! Ex aliquid et a nemo, cumque labore in iusto?',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dtoslzfzn/image/upload/v1606176149/YelpCamp/oou1xeyqe0quvcwoksp7.jpg',
                    filename: 'YelpCamp/oou1xeyqe0quvcwoksp7'
                },
                {
                    url: 'https://res.cloudinary.com/dtoslzfzn/image/upload/v1606176149/YelpCamp/jm2ab8lqqwyycxr4qhu7.jpg',
                    filename: 'YelpCamp/jm2ab8lqqwyycxr4qhu7'
                },
                {
                    url: 'https://res.cloudinary.com/dtoslzfzn/image/upload/v1606176150/YelpCamp/wugz6vallcyqsdm1l5ga.jpg',
                    filename: 'YelpCamp/wugz6vallcyqsdm1l5ga'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})