import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import {body} from 'express-validator';

// import  {  authMiddleware } from "../middlewares/auth-middleware.js";

  const  router = new Router();

//authentication
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max: 32}),
    userController.registration);


router.post('/login', userController.login);

// router.post('/login', userController.login);

export default router;