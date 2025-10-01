/* Import required modules */
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');

/* Connect to the database */
mongoose.connect('mongodb://localhost:27017/yelp-camp').then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
}); 

/* Set up Express app */
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/* Middleware to handle undefined req.body */
app.use((req, res, next) => {
  if (req.body === undefined) {
    req.body = {};
  }
  next();
});

/* Use routes from external files */
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);


/* Define routes */
app.get('/', (req, res) => {
  res.redirect('/campgrounds');
});


app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('error', { statusCode, message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

