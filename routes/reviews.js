const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const Campground = require('../models/campground');
const Review = require('../models/review');
const reviewControl = require('../controllers/reviewControl');

const router = express.Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, catchAsync(reviewControl.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewControl.deleteReivew));

module.exports = router;