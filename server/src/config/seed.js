const mongoose = require('mongoose');
const fs = require('fs');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Tweet = require('./models/Tweet');

const dbURI = 'mongodb+srv://atharvavsankhe22:2022300096@cluster0.quytw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update with your DB URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    seedDB();
  })
  .catch(err => console.log(err));

async function seedDB() {
  try {
    /* 
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Tweet.deleteMany({});
    */

    // Load seed data
    const data = JSON.parse(fs.readFileSync('./data/database-seed.json'));

    // Seed Users
    const users = await User.insertMany(data.users);
    console.log(`${users.length} users inserted`);

    // Seed Profiles
    const profiles = data.profiles.map(profile => {
      profile.user = users.find(user => user._id.toString() === profile.user).id; // link user ID
      return profile;
    });
    await Profile.insertMany(profiles);
    console.log(`${profiles.length} profiles inserted`);

    // Seed Tweets
    const tweets = data.tweets.map(tweet => {
      tweet.author = users.find(user => user._id.toString() === tweet.author).id; // link author ID
      return tweet;
    });
    await Tweet.insertMany(tweets);
    console.log(`${tweets.length} tweets inserted`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}
