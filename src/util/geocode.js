const request = require('request')

const geocode = (address , callback) =>{
    const Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdGlrODY4NiIsImEiOiJja3VkbGV3a2YxYnBrMzFtem01ZnhvMmoyIn0.gU6xe8dpBBd_QPt1CmdgdA&limit=1'
    request({url:Url , json: true} , (error, response) =>{
        if(error){
            callback("Unable to connect to Weather App", undefined)
        }else if(response.body.features.length===0){
            callback("Unable to find the location", undefined)
        }else{
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                loc: response.body.features[0].place_name

            })
        }
    })
}

module.exports = geocode