//needed for importing expressjs in our apllicaton
const express=require('express');
//to import config
const helmet=require('helmet')
const appConfig=require('./config/appConfig')
//for file
const fs=require('fs')
//mongoose
const globalErrorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const mongoose=require('mongoose');
var bodyParser = require('body-parser')

//declaring an instaNCE or crating appllication
const app=express()

//middeleware
//application middleare and third party middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)
app.use(helmet())

//model has to be daclared first as if it will be declared after route then it will be inaccessible

//bootstrap mdoels
//here model is used first very important

let modelsPath='./models'
fs.readdirSync(modelsPath).forEach(file =>{
    if(~file.indexOf('.js')) require(modelsPath + '/' + file)
})
//end bootstrap models

//start route bootstrap
let routesPath='./routes'
fs.readdirSync(routesPath).forEach(file => {
    if(~file.indexOf('.js')){
        console.log("Including file");
        console.log(routesPath+'/'+file);
        let route=require(routesPath+ '/'+ file);
        route.setRouter(app);
    }
    
});
//end bootstrap route

app.use(globalErrorMiddleware. globalNotFoundHandler)
//creates a server on 3000 port
//listening the server-creating  a local server
app.listen(appConfig.port, ()=>{
    console.log("express example listening yo 3000")
    //cfreating the mongoDb connection here
    let db=mongoose.connect(appConfig.db.uri);
})
//handling moongosse connection
mongoose.connection.on('error',function(err){
    console.log('databaseconnection error');
    console.log(err)
});

mongoose.connection.on('open',function(err){
    if(err){
    console.log('database error');
    console.log(err)
    }
    else{
        console.log('successfull');
    }
});