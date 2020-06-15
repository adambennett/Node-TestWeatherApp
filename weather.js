const geo = require('./geocode')
const weather = require('./forecast')

const getWeather = (location, callback) => {
    geo.geocode(location, (geoError, geoData) => {
        if (!geoData) {
            console.log('Could not retrieve weather data. Please try a different search.')
            return
        }
        weather.forecast(geoData.latitude, geoData.longitude, (weatherError, weatherData) => {
            console.log('Weather for ' + geoData.location + '\n\nForecast: ' + weatherData.forecast + '\nTemperature: ' + weatherData.temperature + '°F\nFeels Like: ' + weatherData.feels + '°F')
        })
    })
}

module.exports = {
    getWeather: getWeather
}