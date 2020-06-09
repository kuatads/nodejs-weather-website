const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a974ae4ff636517f4ee3a0eeb4120e1e&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    
    request({ url, json: true}, (error, { body }) => {
        if (error){
           callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const current = body.current
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degress out there. It feels like ' + current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast