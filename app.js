require('dotenv').config();

//modules brought in (allows for there use)
const express = require('express');
const mongoose = require('mongoose');

//defining and instanciating variables
const app = express();
const port = process.env.PORT;
const dbName = process.env.DATABASE_CONN_URL;

//Allow our applicaiton to make use of JSON as it is being send and delivered over a http/https connection
app.use(express.json());

//#region Mongo Connection
mongoose.connect(dbName, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const selectedDB = mongoose.connection;
selectedDB.on('error', () => { console.log('Connection to DB was unsuccessful'); });
selectedDB.once('open', () => { console.log('Connection to DB was successful'); });
//#endregion

//#region Bind and Listen Express
//bind and listen the connections on the specified host and port
app.listen(port, () => {
    console.log(`running on port: localhost:${port}`);
});
//#endregion

//#region Routing Tables
//Create a Routed to allow us to seperate our concerns
const notificationRouter = require('./routes/notifications');
app.use('/notification', notificationRouter);
//#endregion