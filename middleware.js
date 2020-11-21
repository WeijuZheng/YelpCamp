const { campgroundSchema, reviewShcema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'you must be singed in first');
        return res.redirect('/login');
    }
    next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
      next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (campground && !campground.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to do that');
      return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewShcema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',');
      throw new ExpressError(msg, 400);
  } else {
      next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (review && !review.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to do that');
      return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

// check if the user is not logged in
module.exports.notLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    req.flash('success', 'You are already signed in.');
    res.redirect('/campgrounds');
  };