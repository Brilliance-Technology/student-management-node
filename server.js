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

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});