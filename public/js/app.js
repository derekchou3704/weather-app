console.log('Clientside javascript is loaded!')

const queryString = '!'

fetch(`http://localhost:3000/weather?address=${queryString}`).then( res => {
    res.json().then( data => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.placeName)
            console.log(data.tempResponse)
        }
    })
})