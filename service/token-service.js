import jwt from "jsonwebtoken";
const {JWT_ACCESS_SECRET} = process.env;

export const generateToken = async(payload) => {
   try{
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '30d'})
    console.log(accessToken);
    return   accessToken
   }catch(err){
    null
   }
}

export const validateToken = async(token) => {
    try{
        console.log('from validate access token')
        const userData = jwt.verify(token, JWT_ACCESS_SECRET)
        console.log('🎲🎲🎲validate Access Token', userData)
        return userData;
    }catch(err){
        return null
    }
}



