import axios from 'axios'

// add a simple log

const api =axios.create({
    baseURL:'https://api.mapbox.com/geocoding/v5'
})

export default api;