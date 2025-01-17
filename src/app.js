const express=require('express')
const hbs=require('hbs')
const path=require('path')
const request=require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port=process.env.PORT||3000
const app= express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Manashree Patel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manashree Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Manashree Patel'
    })
})

app.get('/weather', (req, res) => {
    const address=req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address, (error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
  
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return   res.send({error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address
            })
      }) 
    })
   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manashree Patel',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Manashree Patel',
        errorMessage: 'Page not found.'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})