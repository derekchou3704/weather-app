const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then( res => {
        msgOne.textContent = 'Loading'
        msgTwo.textContent = ''

        res.json().then( data => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.placeName
                msgTwo.textContent = data.tempResponse
            }
        })
    })
})