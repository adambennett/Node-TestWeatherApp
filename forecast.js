const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=717b011987400019efffa72d90251941&query=' + latitude + ',' + longitude + '&units=f'
    request({url: url, json: true}, (error, response) => {
        if (error) {
           callback('Unable to connect to Weather Services!')
        } else if (response.body.error) {
            callback('Could not get weather from Weather Service. Please try again.')
        } else {
            callback(undefined, {
                forecast: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feels: response.body.current.feelslike
            })
        }
    })
}

module.exports = {
    forecast: forecast
}