const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middlewares/middlewares');
const { createReview, deleteReview } = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(createReview));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(deleteReview));

module.exports = router;