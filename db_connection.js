const mongoos =require('mongoose');
mongoos.connect("mongodb://localhost:27017/StudentManagement",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(" Connecting Successful");
}).catch((e)=>{
    console.log(e);
    console.log("Sorry Connection is Not Establish");
})