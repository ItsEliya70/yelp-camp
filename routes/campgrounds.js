const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas');
const mongoose = require('mongoose');
const {isLoggedIn} = require('../middlewares/middlewares');

function validateCampground(req, res, next) {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }
  else {
    next();
  }   
}

router.get('/', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

router.get('/:id', catchAsync(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  const campground = await Campground.findById(req.params.id).populate('reviews');
  if (!campground) {    
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}));

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
  const newCampground = new Campground(req.body.campground);
  await newCampground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${newCampground._id}`);
}));

router.get("/:id/edit", isLoggedIn, catchAsync(async (req, res) => {  
  if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  const campground = await Campground.findById(req.params.id);
  if (!campground) {    
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render("campgrounds/edit", { campground });
}));

router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash('success', 'Successfully deleted campground');
  res.redirect('/campgrounds');
});

module.exports = router;
