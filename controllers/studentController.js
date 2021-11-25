const express = require('express');
const app=express();
const fs = require('fs')
const multer = require('multer')
const Student_data =require('../modals/studentModal');

//Create Data 
 exports.create=async(req,res)=>{
    try{
        var Storage = multer.diskStorage({
            destination: function(req, file, callback) {
            callback(null, "./Student_Profile_Images");
            },
            
            filename: function(req, file, callback) {
            callback(null,file.fieldname+ "_" + Date.now() + "_" + file.originalname);
            }
          });
         
          var upload = multer({
            storage: Storage
            }).single("profile_picture"); //Field name and max count 
           
            upload(req,res,function(err){
                const userdata = new Student_data({
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    dob: req.body.dob,
                    percentage: req.body.percentage,
                    profile_picture: 'localhost:5000/student/profilePicture/'+req.file.filename 
                });
                
                userdata.save((err,data) => {
                    if (err) {
                        return res.status(400).send({ message: "Somthing Went Wrong" });
                    } else{
                       return res.status(200).json({ message: "Record Insearted", data });  
                    }
                  });

           })
    }catch(e)
    {
         console.log(e);
        res.json({Status:"400",message:"Somthing Went Wrong"}); 
    }

    
}

//Get ALL Data 
 exports.allRecords = async (req, res) => {
    try 
    {
       const Student_ALLdata = await  Student_data.find().sort({'_id':-1});
      res.json({"status": 200, "msg": 'data has been fetched', res: Student_ALLdata });
    }
    catch (err) 
    {
        console.log(err);
        res.json({Status:"400",message:"Somthing Went Wrong"}); 
    }
  }

//Get All Data by Id
 exports.getById = async (req, res) => {
    try 
    {
      const resPerPage = 10; // results per page
      const page = req.params.page || 1; // Page 
      const Student_dataByID = await  Student_data.findById(req.params.id);
      res.json({"status": 200, "msg": 'data has been fetched', res: Student_dataByID});
    }
    catch (err) 
    {
        console.log(err);
        res.json({Status:"400",message:"Somthing Went Wrong"}); 
    }
  }

//Edit By Id
 exports.edit = async (req, res) => {
  try {
      console.log(req.body);
      const user_data = await Student_data.findById(req.params.id);
      console.log(user_data);
      if(user_data){
        var Storage = multer.diskStorage({
          destination: function(req, file, callback) {
          callback(null, "./Student_Profile_Images");
          },
          
          filename: function(req, file, callback) {
          callback(null,file.fieldname+ "_" + Date.now() + "_" + file.originalname);
          }
        });
       
        var upload = multer({
          storage: Storage
          }).single("profile_picture");
           
          const updatedUser = await Student_data.findById(req.params.id).exec();
          upload(req,res,function(err){
            const userdata = new Student_data({
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                dob: req.body.dob,
                percentage: req.body.percentage,
                profile_picture: 'localhost:3000/student/profilePicture/'+req.file.filename 
            })
            updatedUser.set(userdata);
            userdata.save((err,data) => {
                if (err) {
                    return res.status(400).send({ message: "Somthing Went Wrong" });
                } else{
                   return res.status(200).json({ message: "Record Insearted", data });  
                }
              });

       })

          // const updatedUser = await Student_data.findById(req.params.id).exec();
          // updatedUser.set(req.body);
          // var result = await updatedUser.save();
          // res.status(201).json({ "status": 200, "msg": 'record sucessfully updated', result });
      }else
         {
           console.log(user_data)
          res.json({ status:"400",message: "No Record found" });
         }
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
 }
  
  //Delete  one
  exports.delete = async (req, res) => {
    const user_data= await Student_data.findById(req.params.id);
    console.log(user_data);
       if(user_data){
        await Student_data.findById(req.params.id).deleteOne();
        res.json({ status:"200",message: "User has been deleted " });
       }else
       {
           res.json({ status:"400",message: "No Record found" });
       }
  }
  exports.filterbyname=async(req, res)=>{
    const user_data= await Student_data.find({"firstname":req.body.firstname});
    console.log(user_data);
    if(user_data){
     res.json({ status:"200",message: "User has been Found",Data:user_data });
    }else
    {
        res.json({ status:"400",message: "No Record found" });
    }

  }

  exports.filterbypercentage=async(req, res)=>{
    const user_data= await Student_data.find({"percentage":req.body.percentage});
    if(user_data==0){
     res.json({ status:"200",message: "User has been Found",Data:user_data });
    }else
    {
        res.json({ status:"400",message: "No Record found" });
    }

  }

  exports.filterbydob=async(req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total_doc= await salesorder.countDocuments().exec()
    const result = {};
    if (endIndex < (await salesorder.countDocuments().exec()))
    {
      result.next = {
      page: page + 1,
      limit: limit,
      total_doc:Math.round (total_doc/limit)
      };
    }
    if (startIndex > 0)
    {
      result.previous = {
        page: page - 1,
        limit: limit,
        total_doc:Math.round (total_doc/limit)
        };
    }
          const current_date=new Date();
          var today=moment(current_date).format('YYYY-MM-DD');
          console.log(today);
          var current_date1=new Date();
          var firstDay = new Date(current_date1);
          var nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000);
          var week =moment(nextWeek).format('YYYY-MM-DD');
          console.log(week);
  
    try { 
           const date = await Student_data.find({dob :{
            $gte:today,
            $lte:week} 
            }).sort({_id:-1}).limit(limit).skip(startIndex);
           console.log(date);
           if(date==0){
            res.status(401).json({ "status": 401, "msg": 'No Such Record Found', "output":date});
    
          }else{
            res.status(201).json({ "status": 200, "msg": 'records get', "output":date});
          }
    
    }catch(err){
       console.log(err);
        res.status(400).json({ message: err.message });
    }
  
  
  }
