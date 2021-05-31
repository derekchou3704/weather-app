const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGVyZWtjaG91IiwiYSI6ImNrbnN3NG1laDA5bnUybnQ3dzkzZGk2OXkifQ.B-rrpCsG_v2EYJvRpi6Yww`

    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to the location service', undefined)
        } else if (!res.body.features.length) {
            callback('No related data, try other searching terms', undefined)
        } else {
            callback(undefined, {
                lattitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                placeName: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;