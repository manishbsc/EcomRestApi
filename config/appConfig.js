//this file is created to setup basic configuration
//app config is an object
let appConfig={};

appConfig.port=3000;
//all the client are  allowed to accesss via *
appConfig.allowedCorsOrigin="*";
appConfig.env="dev";
appConfig.db={
    uri:'mongodb://127.0.0.1:27017/ecomAppDB',
}
appConfig.apiVersion='/api/v1';

module.exports={
    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    env:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion

}//exports