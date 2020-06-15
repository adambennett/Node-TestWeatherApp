const weather = require('./weather')

let location = process.argv[2]

if (process.argv.length > 3) {
    for (let i = 3; i < process.argv.length; i++) {
        location += process.argv[i]
    }
    weather.getWeather(location, (error, data) => console.log(data))
} else if (process.argv.length < 3) {
    console.log('Please provide a location as an additional command line argument.')
}





