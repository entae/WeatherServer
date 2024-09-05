const request = require('postman-request')
require('dotenv').config()
const mapboxKey = process.env.mapboxAPI


// Geocoding
// takes an address and gives back the Lat/Long

const geocode = (address, callback) => {
    // encodeURIComponent() - function helps to prevent errors if special characters are used by decoding for URL
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=' + mapboxKey + '&limit=1'

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].properties.full_address,
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude
            })
        }
    })
}

module.exports = geocode