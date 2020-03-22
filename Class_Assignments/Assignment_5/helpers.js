
const getTimedData = seconds => new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Data in ${seconds} seconds.`), seconds * 1000);
});

const getChainedTimedData = seconds => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Boris Bazarov',
            secret: new Promise((resolve, reject) => {
                setTimeout(() => resolve('My real name is Sphak.'), 1000);
            }),
        });
    }, seconds * 1000);
});

module.exports = {
    getTimedData,
    getChainedTimedData,
};
