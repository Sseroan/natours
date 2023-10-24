import express from 'express';
import userController from './../controllers/userController.js';


// Users routes

//Middleware for routes - Mounting a new router on a route
const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

export default router;
