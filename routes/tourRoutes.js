import express from 'express';

// use this when export default in controller
// import tourController from '../controllers/tourController.js';

// use this when export const NAME in controller .. check user
import {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from './../controllers/tourController.js';

//Middleware for routes - Mounting a new router on a route
const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

export default router;
