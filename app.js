if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
/* Import required modules */
const express = require('express');
const mongoose = require('mongoose');
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/users');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

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
app.set('query parser', 'extended');
app.use(sanitizeV5({ replaceWith: '_' }));

app.use(session({
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Middleware to set flash messages in res.locals */
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
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
app.use("/", usersRoutes);

/* Define routes */
app.get('/', (req, res) => {
  res.render('home');
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

