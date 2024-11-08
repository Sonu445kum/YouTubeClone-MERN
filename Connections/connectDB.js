const mongoose = require("mongoose");


// connection to db
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDb is Successfully Connected..!!")
}).catch(error=>{
    console.log("Error in Connecting to MongoDB",error)
})