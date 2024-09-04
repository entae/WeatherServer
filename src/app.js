const path = require('path')
const express = require('express')
const hbs = require('hbs')

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

// /weather
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Overcast',
        location: 'Toronto',
        name: 'In Tae Chung'
    })
})

// runs once to make the page go live
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})