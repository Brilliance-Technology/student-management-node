const express=require('express');
const app= express();
require('./db_connection');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')
app.use(cors());

const StudentUser=require('./routers/student')
app.use('/student',StudentUser);

app.listen(5000,() =>{
    console.log(" Server Listen at Port 5000");

});