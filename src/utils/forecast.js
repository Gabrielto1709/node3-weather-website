const request = require('postman-request')
const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=841f9518580892b2763bf02423f4f2d6&query='+ latitude+ ','+ longitude +'&units=f'
    request({ url, json: true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to weather service')
        }else if (body.error){
            callback('Unable to find location')
        }else{
            const currentInfo = body.current
            callback(undefined, `${currentInfo.weather_descriptions[0]}.  It is ${currentInfo.temperature} degrees out.  It feels like ${currentInfo.feelslike} degrees out`)
        }
    })
}
module.exports = forecast