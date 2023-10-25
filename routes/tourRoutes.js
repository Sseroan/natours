import express from 'express';

// use this when export default in controller
import tourController from '../controllers/tourController.js';

// use this when export const NAME in controller
// import {
//   getAllTours,
//   getTour,
//   createTour,
//   updateTour,
//   deleteTour,
//   checkID,
// } from './../controllers/tourController.js';

//Middlewares

// For routes - Mounting a router on a route
const router = express.Router();

// Runs for a certain parameter in the url ie id
router.param('id', tourController.checkID);

// router.route('/').get(getAllTours).post(checkBody, createTour);
// router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
