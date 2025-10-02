const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const mongoose = require('mongoose');
const {isLoggedIn, validateCampground, isAuthor} = require('../middlewares/middlewares');

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
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
  if (!campground) {    
    req.flash('error', 'Cannot find that campground!');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}));

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
  const newCampground = new Campground(req.body.campground);
  newCampground.author = req.user._id;
  await newCampground.save();
  req.flash('success', 'Successfully made a new campground!');
  res.redirect(`/campgrounds/${newCampground._id}`);
}));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(async (req, res) => {  
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground });
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash('success', 'Successfully deleted campground');
  res.redirect('/campgrounds');
});

module.exports = router;
