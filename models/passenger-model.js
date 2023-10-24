import  {Schema, model} from 'mongoose';

const PassengerSchema = new Schema({
    
    PassengerId : {type: Number, unique: true,  required: true},
    Survived: {type: Number, required: true},
    Pclass : {type: Number, required: true},
    Name : {type: String,  trim: true, required: true},
    Sex : {type: String, required: true},
    Age : {type: Number, required: true, default: "" },
    SibSp  : {type: Number, required: true},
    Parch  : {type: Number, required: true},
    Ticket  : {type: Number, required: true},
    Fare  : {type: Number, required: true},
    Cabin  : {type: String, required: true, default: "" },
    Embarked  : {type: String, required: true, default: ""},
}
, {collection: "passengers"})

const PassengerModel = model("Passenger", PassengerSchema);

export default PassengerModel;
