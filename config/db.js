const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
//const dbRoute = 'mongodb+srv://sa:ABCabc123@cluster0-apldc.mongodb.net/merntasks';

//const dbRoute2 = 'mongodb+srv://sa:ABCabc123@cluster0-apldc.mongodb.net/test?retryWrites=true&w=majority';

const conectarDB = async () => {
    try { 
                await 
                mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

                //mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, reconnectTries: 30, reconnectInterval: 500 }).then(() => { console.log('Connected to mongoDB')})


        console.log('DB Conectada');

    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app
    }

}

module.exports = conectarDB;







































