
const mongoose = require('mongoose');


function connection(){
    return mongoose.connect('mongodb://localhost/restapi_db',{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true})
    .then(_=> console.log('Database connection'))
    .catch(err=>console.log(err));
};

module.exports = connection;