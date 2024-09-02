const path = require('path')
const express = require('express')

// used one time to create an app
// then we can use functions from this app to help create our page
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// rendering dynamic elements using handlebar
// also lets us use a template engine
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'InTae Chung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'Do you require assistance?'
    })
})

// /weather
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Overcast',
        location: 'Toronto'
    })
})

// runs once to make the page go live
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})