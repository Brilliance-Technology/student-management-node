const express=require('express');
const app= express();

// let port = process.env.PORT ||3000;
require('./db_connection');
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')
app.use(cors());

const StudentUser=require('./routers/student')
app.use('/student',StudentUser);

app.listen(process.env.PORT, '0.0.0.0');