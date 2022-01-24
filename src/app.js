const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicIndexDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicIndexDirectory))

//setup index page
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App', 
        name: 'Gabriel Tellez'
    })
})

//setup /about
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Gabriel Tellez'
    })
})

//setup /help 
app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'This is customer service',
        title: 'Help',
        name: 'gabriel'
    })
})

//setup weather index and ?address query and return forecast
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }else{

        geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
            if(error){
                return res.send({ error })
            }

            forecast( longitude, latitude, (error, forecastData)=>{
                if(error){
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })
    }
    // res.send({
    //     forecast: 'it be 50 degrees out dawg',
    //     location: "Phillly",
    //     address: req.query.address
    // })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res)=>{
    res.render('404.hbs', {
        title: '404',
        error: 'Help article not found',
        name: 'Gabriel Tellez'
    })
})

app.get('*', (req, res)=>{
    res.render('404.hbs', {
        title: '404',
        error: '404 page',
        name: 'Gabriel Tellez'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})