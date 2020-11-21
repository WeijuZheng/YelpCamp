const express = require('express');
const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');
const campgroundControl = require('../controllers/campgroundControl');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const router = express.Router();

router.route('/')
    .get(catchAsync(campgroundControl.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgroundControl.createCampground));


router.get('/new', isLoggedIn, campgroundControl.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundControl.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundControl.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundControl.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundControl.renderEditForm));

module.exports = router;
