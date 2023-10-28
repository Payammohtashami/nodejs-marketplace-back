const redisDB = require('redis')
const redisClient = redisDB.createClient();

redisClient.connect();
redisClient.on('connect', () => console.log('Connect To redis'));
redisClient.on('error', (error) => console.log('redis error: ', error.message));
redisClient.on('connected', () => console.log('Connected To redis and ready to use!'));
redisClient.on('end', () => console.log('Disconnected from redis ...'));

module.exports = redisClient;