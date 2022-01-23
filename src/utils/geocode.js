const request = require('postman-request')

//Geocoding api request
//Address -> lat/long -> Weather
const geocode = (location, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiZ2FicmllbHRvIiwiYSI6ImNreHV5bjRjMDBwb3cyd3FmOGJ1MDEwbHYifQ.7gSgHbvAC_f_cYqFU5R2hg&limit=1'
    request({ url, json: true}, (error,{ body })=>{
        if(error){
            callback('Unable to connect to location services')
        }else if(body.features.length === 0){
            callback('Unable to find location.  Try another search')
        }else{
            const coordinates = body.features[0].center
            callback(undefined, {
                latitude: coordinates[1],
                longitude: coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
