const request = require('request')

const location = process.argv[2]
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoibnlveGlkZSIsImEiOiJja2Jnbmg1Y3kxNzVzMzZtZWRrYXF5MDlhIn0.hIFo0aIPoV6QvzUJkESosg&limit=1'

request({url: url, json: true}, (geoError, geoResponse) => {
    if (geoError) {
        console.log('Unable to convert location into Latitude/Longitude!')
    } else if (geoResponse.body.features.length < 1) {
        console.log('Could not find location: ' + location)
    } else {
        const latitude = geoResponse.body.features[0].center[1]
        const longitude = geoResponse.body.features[0].center[0]
        const endpoint = 'http://api.weatherstack.com/current?access_key=717b011987400019efffa72d90251941&query=' + latitude + ',' + longitude + '&units=f'
        request({url: endpoint, json: true}, (weatherError, weatherResponse) => {
            if (weatherError) {
                console.log('Unable to connect to Weather Service!')
            } else if (weatherResponse.body.error) {
                console.log('Could not find location from Weather Service.')
            } else {
                const place = geoResponse.body.features[0].place_name
                const data = 'Weather for ' + place + '\n\nForecast: ' + weatherResponse.body.current.weather_descriptions[0] + '. \nTemperature: ' + weatherResponse.body.current.temperature + '°F.\nFeels Like: ' + weatherResponse.body.current.feelslike + '°F.'
                console.log(data)
            }
        })
    }
})

