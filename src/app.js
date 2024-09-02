const path = require('path')
const express = require('express')

// used one time to create an app
// then we can use functions from this app to help create our page
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

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