const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// used one time to create an app
// then we can use functions from this app to help create our page
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'In Tae Chung'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'In Tae Chung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Do you require assistance?',
        name: 'In Tae Chung'
    })
})

app.get('/weather', (req, res) => {
    // if there's no address being searched send error
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address to search'
        })
    } else { 
        // address was provided
        geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
            if (error) {
                // address could not be matched to any result
                res.send({ error })
            } else {
                // there was a match for the address
                forecast(latitude, longitude, (error, weatherData) => {
                    // if there was an error retrieving the data
                    if (error) {
                        return res.send({ error })
                    }
                    
                    // data was found, is passed on as JSON
                    res.send({
                        forecast: weatherData,
                        location,
                        address: req.query.address
                    })
                    console.log(location)
                    console.log(weatherData)
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        
    } else {
        res.send({
            products: [],
        })
    }
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'In Tae Chung',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page not found',
        name: 'In Tae Chung',
        errorMessage: 'Page not found'
    })
})

// runs once to make the page go live
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})