let mongoose=require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true }).then(()=>{
    console.log('connected at: '+process.env.DB_URI);
}).catch(()=>{
    console.log('not connected');
});