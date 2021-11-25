const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController");

// Create One Route
router.post("/create",StudentController.create);

//get one Routes by id
router.get("/get/:id",StudentController.getById);

//get all record
router.get("/getAll",StudentController.allRecords);

//update record by id
router.put("/edit/:id",StudentController.edit);

//Delete Record By Id
router.delete("/delete/:id",StudentController.delete);

//image open in browser
router.use('/profilePicture',express.static('Student_Profile_Images'));

//search by name
router.post("/searchbyname",StudentController.filterbyname);

//search by percentage
router.post("/searchbyPercentage",StudentController.filterbypercentage);


module.exports = router;