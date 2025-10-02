const mongoose = require('mongoose');

/* Define Campground schema and model */
const campgroundSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

/* Middleware to delete associated reviews when a campground is deleted */
campgroundSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await mongoose.model('Review').deleteMany({
      _id: {
        $in: doc.reviews
      }
    });
  }
});

module.exports = mongoose.model('Campground', campgroundSchema);