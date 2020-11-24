const express = require('express');
const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');
const campgroundControl = require('../controllers/campgroundControl');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const router = express.Router();

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage: storage });

router.route('/')
    .get(catchAsync(campgroundControl.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundControl.createCampground));
    
router.get('/new', isLoggedIn, campgroundControl.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundControl.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundControl.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundControl.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundControl.renderEditForm));

module.exports = router;
