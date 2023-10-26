import PassengerModel from "../models/passenger-model.js";

export const getAllPassengers = async() => {
    const passengers = await PassengerModel.find({});
    return passengers;
}
export const getPassengersByCriteria = async(options) => {
    const passengers = await PassengerModel
    .find(options)
    .sort([['Age', 1]])
    .exec();
    return passengers;
}

