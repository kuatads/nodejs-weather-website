const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs') // Handblebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Tads Tuyco'
    })
}) 

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Tads Tuyco'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help',
        message: 'This is a help page sending you a message',
        name: 'tads'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an addess!'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error: error})
        } 
        forecast(latitude, longitude, (error, {forecast, weatherIcon})=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecastData: forecast,
                location,
                address: req.query.address,
                icon: weatherIcon
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errormessage: 'Help article not found!',
        name: 'Tads Tuyco',
        title: 'Help 404 Page'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errormessage: 'Page not found!',
        name: 'Tads Tuyco',
        title: '404 Page'
    })
})


app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})

