import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import * as passengerController from "../controllers/passenger-controller.js";
import {body} from 'express-validator';
import  { authMiddleware } from "../middlewares/auth-middleware.js";

  const  router = new Router();

//#authentication
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max: 32}),
    userController.registration);

router.post('/login', userController.login);


//#todo ?
// router.post('/logout', userController.logout);



//#protected routes
router.post('/passengers', authMiddleware,  passengerController.passengers);

router.get('/user/:id', authMiddleware,  userController.userDetails);

router.post('/user/:id', authMiddleware,  userController.userUpdate); 

router.delete('/user/:id', authMiddleware,  userController.userDelete); 


export default router;