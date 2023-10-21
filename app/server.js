const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/router');

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.consfigApplication();
        this.connectMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    };

    consfigApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        this.#app.use(morgan('dev'));
    };

    createServer(){
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`Server run on port http://localhost:${this.#PORT}`);
        });
    };

    connectMongoDB(){
        mongoose.connect(this.#DB_URI).then(() => {
            console.log('Server Connected To mongoDB 😍');
        }).catch((error) => {
            console.log({error});
        });
    };
    
    errorHandling(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: 'Page Not Found!',
            });
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.status ?? 500;
            const message = error?.message ?? 'Internal Server Error';
            return res.status(status).json({
                status,
                message,
            })
        });
    };
    
    createRoutes(){
        this.#app.use(router);
        this.#app.get('/', (req, res, next) => {
            return res.status(200).json({
                message: 'Hello To My Marketplace',
            });
        });
    };
};