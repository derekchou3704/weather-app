const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const temperature = require('./utils/temperature')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Derek Chou'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Derek Chou'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is sth to help',
        title: 'Help',
        name: 'Derek Chou'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (err, { lattitude, longitude, placeName } = {}) => {
        if (err) return res.send({error: err})
    
        temperature(lattitude, longitude, (err, tempData) => {
            if (err) return res.send({error: err})
            
            const tempResponse = `It's ${tempData.temp} now and it feels like ${tempData.feelslike}`
            return res.send({
                placeName, 
                tempResponse
            });
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Derek Chou',
        errorMessage: 'Help Article Not Found UMU'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Derek Chou',
        errorMessage: '404 Not Found OWQ'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})