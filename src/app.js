const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
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
        helpText: 'This is sth to help'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Taipei'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})