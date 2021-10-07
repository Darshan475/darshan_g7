const request = require('request')

const forecast = (lat, long , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=d5897d30ff5c0f9fa4708dd7921d3598&query='+lat+','+long+''
    request({url:url , json: true} , (error, response) =>{
        if(error){
            callback("Unable to connect to Weather App", undefined)
        }else if(response.body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined , response.body.current.weather_descriptions[0] + " It is currently "+ response.body.current.temperature + " degrees out . It feels like "+response.body.current.feelslike+' degrees out . This humidity is '+response.body.current.humidity+'%. ')
        }
    })
}

module.exports = forecast