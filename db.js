import mongoose from 'mongoose';

const {URI_MONGO, DB_NAME } = process.env;

const URI = `${URI_MONGO}/${DB_NAME}?retryWrites=true&w=majority`;


const MongoDBClient = {
    initialize: async() => {
        try {
            const client = await mongoose.connect(URI, 
                { 
                    useNewUrlParser: true, 
                    useUnifiedTopology: true
                })
            
            if (client){
                console.log(`🎉🎉 successfully connected to DB: ${DB_NAME}`)
            }

        } catch(err) {
            console.error('Erreur de connexion à la base MongoDB', err.message)
        }
    }
}

export default MongoDBClient;

