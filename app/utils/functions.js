function randomNumberGenerator(length){
    return Math.floor((Math.random() * 9 * 10^(length - 1)) + 10^(length - 1));
};

module.exports = {
    randomNumberGenerator,
};