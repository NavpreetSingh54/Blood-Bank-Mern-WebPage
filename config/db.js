const mongoose=require('mongoose');
const connectDB=async()=>{
try{
await mongoose.connect(process.env.MONGOSE_URL)
console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgCyan.white)
}
catch(error){
console.log(`Mongoose Database Error ${error}`.bgRed.white)
}
}
module.exports=connectDB;