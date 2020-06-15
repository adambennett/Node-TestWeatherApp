const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibnlveGlkZSIsImEiOiJja2Jnbmg1Y3kxNzVzMzZtZWRrYXF5MDlhIn0.hIFo0aIPoV6QvzUJkESosg&limit=1'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Location Services!')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode: geocode
}