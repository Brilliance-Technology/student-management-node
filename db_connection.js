const mongoos =require('mongoose');
mongoos.connect("mongodb+srv://root:root@cluster0.izw0i.mongodb.net/studentsmanagment?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(" Connecting Successful");
}).catch((e)=>{
    console.log(e);
    console.log("Sorry Connection is Not Establish");
})