const request = require('request')

const forecast = (lat, long , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=d5897d30ff5c0f9fa4708dd7921d3598&query='+lat+','+long+''
    request({url:url , json: true} , (error, response) =>{
        if(error){
            callback("Unable to connect to Weather App", undefined)
        }else if(response.body.error){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, "It is currently "+"" +response.body.current.temperature + " but feels like "+"" +response.body.current.feelslike)
        }
    })
}

module.exports = forecast