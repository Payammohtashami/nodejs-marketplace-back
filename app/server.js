const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/router');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const createErrors = require('http-errors')

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.consfigApplication();
        this.connectMongoDB();
        this.initRedis();
        this.createServer();
        this.createRoutes();
        this.errorHandling();
    };

    consfigApplication(){
        this.#app.use(morgan('dev'));
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        this.#app.use(
            "/api-docs",
            swaggerUI.serve,
            swaggerUI.setup(
                swaggerJsDoc({
                    swaggerDefinition: {
                        openapi: '3.0.0',
                        info: {
                            title: "Marketplace Practice",
                            version: "1.0.0",
                            contact: {
                                name: "Payam Mohtashami",
                                email: "p.mohtashami.1382.4@gmail.com",
                            },
                        },
                        servers: [
                            {url: "http://localhost:5000"}
                        ],
                        components: {
                            securitySchemes: {
                                BearerAuth: {
                                    type: "http",
                                    scheme: 'bearer',
                                    bearerFormat: 'JWT'
                                },
                            },
                        },
                        security: [{BearerAuth: []}]
                    },
                    apis: ["./app/router/**/*.js"],
                }),
                {explorer: true}
            )
        );
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
        mongoose.connection.on('connected', () => {
            console.log('mongoose connected to DB');
        });
        mongoose.connection.on('disconncted', () => {
            console.log('mongoose connection is disconnected!');
        });
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    };

    initRedis(){
        require('./utils/init_redis')
    };

    errorHandling(){
        this.#app.use((req, res, next) => {
            next(createErrors.NotFound('Page not found!'))
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createErrors.InternalServerError()
            const status = error?.status ?? serverError.status;
            const message = error?.message ?? serverError.message;
            return res.status(status).json({
                data: null,
                errors: {
                    status,
                    message,
                }
            })
        });
    };
    
    createRoutes(){
        this.#app.use('/api', router);
    };
};

// {
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODc4NzkxMiwiZXhwIjoxNjk4NzkxNTEyfQ.ejJ0j2HtamgXz_6rxN2QHOZx8prR5Z5-60RkzgS0654",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTE4Nzk1ODgwNSIsImlhdCI6MTY5ODc4NzkxMiwiZXhwIjoxNzMwMzQ1NTEyfQ.tCCXtoRbaR7vfpG__idWgSKs7o7CBVvjZjiyCabZ2nc"
// }