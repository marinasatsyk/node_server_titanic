import { body } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";
import * as tokenService from '../service/token-service.js';

export const authMiddleware = async(req, res, next) => {
    try{
        const authorisationHeader = req.headers.authorization;

        if(!authorisationHeader){
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorisationHeader.split(' ')[1];

        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }

        console.log(accessToken)
        const userData = await tokenService.validateToken(accessToken);
        
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next();

    }catch(err){
        return next(ApiError.UnauthorizedError())
    }
}