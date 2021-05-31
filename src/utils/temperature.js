const request = require('postman-request');
// const axios = require('axios') //Current subscription plan does not support HTTPS Encryption
const params = {
    access_key: 'b1ecd3da8e47f0d1690f82a8a1daa995',
    query: ''
}

const temperature = (lattitude, longitude, callback) => {
    params.query = `${lattitude},${longitude}`;
    const url = `http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to the location service', undefined)
        } else if (body.error) {
            callback('No related data, try other searching terms', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = temperature;
