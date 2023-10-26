import * as PassengerService from '../service/passenger-service.js';


export const passengers = async(req, res, next) => {
   
    try{
        const ranges = req.body?.ageRanges;
        const passengersByRanges = [];
        const passengersNoAges = [];
        console.log("*************************************", req.body)
        if(ranges){
            
            for await(const range of ranges){

             let  options= {}; 
                
             if(range.from && range.to){
                      options = {
                        $and: [
                            {Age: {
                               $gte : range.from
                            }},
    
                            {Age: {
                                $lte: range.to
                            } }
                        ]
                    }
                }else if(range.from &&!range.to ){
                    options = {
                           Age: {
                               $gte : range.from
                            }
                        
                    }
                }else if(!range.from &&range.to){
                    options = {  Age: {
                        $lte: range.to
                    } }
                }else{
                    options = {
                        Age:  -1 
                    }
                }

                const pData =   await PassengerService.getPassengersByCriteria(options);
                const data = Object.keys(range).length ?   {...range, pData} : {pData}
                
                passengersByRanges.push(data)
             }
        }
        console.log(passengersByRanges[0])
        return res.json(passengersByRanges);
    }catch(err){
        next(err) //we use error middleware 
    }
}