var express = require('express');
var router = express.Router();
const tourController = require('../controllers/tourController');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// Routes for tours
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour)
router
  .route('/:id')
  .get(tourController.getOneTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router;
