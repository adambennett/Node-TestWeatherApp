const weather = require('./weather')

// Get location from user
let location = process.argv[2]
if (process.argv.length > 3) {
    for (let i = 3; i < process.argv.length; i++) {
        location += process.argv[i]
    }
}

// Fetch weather data and print to console
weather.getWeather(location, (error, data) => console.log(data))

