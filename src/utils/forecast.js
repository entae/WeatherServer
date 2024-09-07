const request = require('postman-request')
require('dotenv').config()
const weatherKey = process.env.weatherStackAPI

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=' + weatherKey + '&query=' + latitude + ', ' + longitude + '&units=m'
    // units
    // m = metric system
    // f = Fahrenheit system
    // s = scientific system (Kelvin)

    request({ url, json: true}, (error, {body} ) => {
        if (error) {
            console.log('Unable to connect to weather service', undefined)
        } else if (body.error) {
            console.log('Unable to find location', undefined)
        } else {
            callback(undefined,
                'Weather condition: ' + body.current.weather_descriptions[0] + 
                // ' <img id="weather-icon" src="' + body.current.weather_icons + '" alt="Weather Icon"> \n' + 
                '\nIt is currently ' + body.current.temperature + ' degrees Celsius out.\n' + 
                'It feels like ' + body.current.feelslike + ' degrees Celsius out.\n' + 
                'The relative humidity is ' + body.current.humidity + '%.\n' +
                'The UV index is ' + body.current.uv_index + '.\n '
                )
        }
    })
}

module.exports = forecast

// weather: response.body.current.weather_descriptions[0],
// temperature: response.body.current.temperature,
// feelslike: response.body.current.feelslike