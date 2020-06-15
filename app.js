const request = require('request')
const geo = require('./geocode.js')
const weather = require('./forecast.js')

let location = process.argv[2]
if (process.argv.length > 3) {
    for (let i = 3; i < process.argv.length; i++) {
        location += process.argv[i]
    }
}

geo.geocode(location, (error, data) => {
    if (!data) {
       console.log('Could not retrieve weather data. Please try a different search.')
       return
    }
    const locale = data.location
    weather.forecast(data.latitude, data.longitude, (error, data) => {
        console.log('Weather for ' + locale + '\n\nForecast: ' + data.forecast + '\nTemperature: ' + data.temperature + '\nFeels Like: ' + data.feels)
    })
})

