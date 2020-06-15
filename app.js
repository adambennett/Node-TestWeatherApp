const request = require('request')

const location = 'newark'
const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoibnlveGlkZSIsImEiOiJja2Jnbmg1Y3kxNzVzMzZtZWRrYXF5MDlhIn0.hIFo0aIPoV6QvzUJkESosg&limit=1'

request({url: geourl, json: true}, (geoError, geoResponse) => {
    const latitude = geoResponse.body.features[0].center[1]
    const longitude = geoResponse.body.features[0].center[0]
    const endpoint = 'http://api.weatherstack.com/current?access_key=717b011987400019efffa72d90251941&query=' + latitude + ',' + longitude + '&units=f'
    request({url: endpoint, json: true}, (weatherError, weatherResponse) => {
        const place = geoResponse.body.features[0].place_name
        const data = 'Weather for ' + place + '\n\nForecast: ' + weatherResponse.body.current.weather_descriptions[0] + '. \nTemperature: ' + weatherResponse.body.current.temperature + '°F.\nFeels Like: ' + weatherResponse.body.current.feelslike + '°F.'
        console.log(data)
    })
})

