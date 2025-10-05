const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String
});
ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});
/* Define Campground schema and model */
const campgroundSchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String, // GeoJSON type
      enum: ['Point'], // 'Point' is the only allowed type
      required: true
    },
    coordinates: {
      type: [Number], // Array of numbers: [longitude, latitude]
      required: true
    }
  },
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