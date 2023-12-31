import { ApiError } from '../exceptions/api-error.js';
import * as  userService from '../service/user-service.js';
import { validationResult } from 'express-validator';



export const  registration =  async(req, res, next) =>  {
    try{
        const errors = validationResult(req); //result from express validators
        
        if(!errors.isEmpty()){
            return next(ApiError.BadRequest('Validation error', errors.array()))
        }
        
        const {email, password, firstName, lastName} = req.body;

        const userData = await userService.registration(email, password, firstName, lastName);
        
        // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true}) //for clientSide cookies refreshToken
        return res.json(userData); //sent in client side json object
    }catch(err){
        next(err)
    }
}


export const login =  async(req, res, next) =>  {
    try{
        const {email, password} = req.body;
        const userData = await userService.login(email, password);
        
        return res.json(userData); //sent in client side json object

    }catch(err){
        next(err) //we use error middleware 
    }
}


export const userDetails = async(req, res, next) =>  {
    try{
        const {id} = req.params;
        const userData = await userService.userDetails(id);
        
        return res.json(userData); //sent in client side json object

    }catch(err){
        next(err) //we use error middleware 
    }
}

export const userUpdate = async(req, res, next) =>  {
    try{
        const {id} = req.params;
        const {email, firstName, lastName, createdDateTime, role, preferences} =  req.body;
        const dataForUpdate = {email, firstName, lastName, createdDateTime, role, preferences}
        const userData = await userService.findOneAndUpdate(id, dataForUpdate);

        return res.json(userData); //sent in client side json object
    }catch(err){
        next(err) //we use error middleware 
    }
}

export const userDelete = async(req, res, next) =>  {
    try{
        const {id} = req.params;
        const userData = await userService.findOneAndDelete(id);
        return res.json(userData); //sent in client side json object
    }catch(err){
        next(err) //we use error middleware 
    }
}

