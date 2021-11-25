const mongoose=require('mongoose');
const student=new mongoose.Schema({
    firstname : {
        type:String
    },
    lastname : {
        type:String
    },
    dob: {
        type:String
    },
    percentage:{
        type:String
    },
    profile_picture:
    {
        type:String
    }

});
const Student_Details =new mongoose.model("Student_detail",student);
module.exports=Student_Details;