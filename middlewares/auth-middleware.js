import { body } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";
import * as tokenService from '../service/token-service.js';

export const authMiddleware = async(req, res, next) => {
    try{
        const authorisationHeader = req.headers.authorization;

       
        if(!authorisationHeader){
            console.log("***", 'no token')
            return next(ApiError.UnauthorizedError())
        }
        console.log("====>", authorisationHeader)
        const accessToken = authorisationHeader.split(' ')[1];

        if(!accessToken){
            console.log("***", 'token  wrong')
            return next(ApiError.UnauthorizedError())
        }
        
        console.log('accessToken', accessToken)
        const userData = await tokenService.validateToken(accessToken);
        console.log("userData", userData)
        

        if(!userData){
            console.log("!user data")
            return next(ApiError.UnauthorizedError())
        }


        req.user = userData;
        next();

    }catch(err){
        return next(ApiError.UnauthorizedError())
    }
}