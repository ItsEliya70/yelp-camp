const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const mongoose = require('mongoose');
const {isLoggedIn, validateCampground, isAuthor} = require('../middlewares/middlewares');
const {index, renderNewForm, createCampground, showCampground, renderEditForm, updateCampground, deleteCampground} = require('../controllers/campgrounds');

router.route('/')
  .get(catchAsync(index))
  .post(isLoggedIn, validateCampground, catchAsync(createCampground));
router.get('/new', isLoggedIn, renderNewForm);
router.route('/:id')
  .get(catchAsync(showCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm));

module.exports = router;
