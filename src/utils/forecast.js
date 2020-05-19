const request = require('request')
const forecast=(lat,long,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&APPID=dcbc2c8b551b0b049173c46adf08b1e1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to forecast services!',undefined)
        }
        else if(body.error){
            callback('No such location is present',undefined)
        }
        else{
            callback(undefined,' It is currently ' + body.main.temp + ' degress out. Weather description ' + body.weather[0].description)
        }

    })
}

module.exports=forecast