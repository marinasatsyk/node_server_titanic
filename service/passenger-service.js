import PassengerModel from "../models/passenger-model.js";

export const getAllPassengers = async() => {
    const passengers = await PassengerModel.find({});
    return passengers;
}

