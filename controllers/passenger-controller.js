import * as PassengerService from '../service/passenger-service.js';


export const passengers = async(req, res, next) => {
    try{
        const passengers = await PassengerService.getAllPassengers();
        return res.json(passengers);
    }catch(err){
        next(err) //we use error middleware 
    }
}