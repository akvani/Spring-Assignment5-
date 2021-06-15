// Database Connection

const mongoose = require('mongoose')

// Creating Mongoo Connection
function createMongoConnection(){
    mongoose.connect('mongodb://localhost:27017/IBMWave14' , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

    return mongoose.connection;
   
}


// get mongoo connection string

function getMongoConnection(){
    return mongoose.connection;
}


module.exports={
    getMongoConnection,
    createMongoConnection
}