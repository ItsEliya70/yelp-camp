const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, validateCampground, isAuthor} = require('../middlewares/middlewares');
const {index, renderNewForm, createCampground, showCampground, renderEditForm, updateCampground, deleteCampground} = require('../controllers/campgrounds');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(index))
  .post(isLoggedIn, upload.array('images'), validateCampground, catchAsync(createCampground));

router.get('/new', isLoggedIn, renderNewForm);
router.route('/:id')
  .get(catchAsync(showCampground))
  .put(isLoggedIn, isAuthor, upload.array('images'), validateCampground, catchAsync(updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm));

module.exports = router;
