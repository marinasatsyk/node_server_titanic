import UserModel from "../models/user-model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 import * as tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import { ApiError } from "../exceptions/api-error.js";
import mongoose from "mongoose";

const SALTROUNDS = 10;


export const registration = async (email, password, firstName, lastName, role = 'user') => {
    console.log(email, password, firstName, lastName, role);
   //verify user exists
    const candidate = await UserModel.findOne({email})
    if(candidate){
        console.log("candidate", candidate)
        throw ApiError.BadRequest('email exists');  
    }
    //crypt password 
    const hash = await bcrypt.hash(password, SALTROUNDS);
    
    //create user 
   
    const dateNow = Date.now()

    const userDoc = await  UserModel.create({
        email,
        password: hash,
        firstName,
        lastName,
        createdDateTime: new Date(dateNow).toISOString(),
        role
    }) 

    const userDto = new UserDto(userDoc); //id, email, firstName, lastName
    
    //generate tokens
    const token = await tokenService.generateToken({...userDto});

    return{ token, user: userDto }
}


export const login = async (email, password) => {

    const userDoc = await UserModel.findOne({email});
    if(!userDoc){
        throw ApiError.BadRequest('User doesn\'t found')
    }
    const compare = await bcrypt.compare(password, userDoc.password);

    if(!compare){
        throw ApiError.BadRequest('Wrong username or password')
    }

    const userDto = new UserDto(userDoc);

    const token = await tokenService.generateToken({...userDto});
   
    return{ token, user: userDto }
   
}

export const userDetails = async (userId) => {
     const id = new mongoose.Types.ObjectId(userId);
    const userDoc = await UserModel.findById(id);
    if(!userDoc){
        throw ApiError.BadRequest('User doesn\'t found')
    }

    const {email, firstName, lastName, createdDateTime, role, preferences} = userDoc;
    const userData = {email, firstName, lastName, createdDateTime, role, preferences};
    return{ userData }
}
export const findOneAndUpdate = async (userId, dataForUpdate) => {
     const id = new mongoose.Types.ObjectId(userId);
    
     console.log(dataForUpdate)
      
    const userDoc = await UserModel.findByIdAndUpdate({_id: id}, {$set: dataForUpdate})
    
    if(!userDoc){
        throw ApiError.BadRequest('User doesn\'t found')
    }
    const updatedUserDoc = await UserModel.findById(id)

    const {email, firstName, lastName, createdDateTime, role, preferences} = updatedUserDoc;
    const userData = {email, firstName, lastName, createdDateTime, role, preferences};
    return{ userData }
}

