const Application = require('./app/server');
require('dotenv').config();
new Application(process.env.PORT, process.env.MONGO_DB_URL);