import UserModel from "../models/user-model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 import * as tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import { ApiError } from "../exceptions/api-error.js";
import mongoose from "mongoose";
import { isEmail } from "../helpers/helpers.js";

const SALTROUNDS = 10;


export const registration = async (email, password, firstName, lastName, role = 'user') => {
   //verify user exists
    const candidate = await UserModel.findOne({email})
    if(candidate){
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

    if(dataForUpdate.email){
    const checkEmail = dataForUpdate.email.trim().toLowerCase();
    if(!isEmail(checkEmail)){
        throw ApiError.BadRequest('Email format incorrect')
    }

    const userDocVeirify = await UserModel.findOne({email: checkEmail});

    console.log(userDocVeirify)
        if(userDocVeirify){
            throw ApiError.BadRequest('User with email exists')
        }  
    }

    const userDoc = await UserModel.findByIdAndUpdate({_id: id}, {$set: dataForUpdate})
    
    if(!userDoc){
        throw ApiError.BadRequest('User doesn\'t found')
    }
    const updatedUserDoc = await UserModel.findById(id)

    const {email, firstName, lastName, createdDateTime, role, preferences} = updatedUserDoc;
    const userData = {email, firstName, lastName, createdDateTime, role, preferences};
    return{ userData }
}

export const findOneAndDelete = async (userId) => {
    const id = new mongoose.Types.ObjectId(userId);

    const updatedUserDoc = await UserModel.findById(id);
    if(!updatedUserDoc){
        throw ApiError.BadRequest('User doesn\'t found')
    }
    const userDoc = await UserModel.findByIdAndDelete(id);
   
    return{ userDoc }
}