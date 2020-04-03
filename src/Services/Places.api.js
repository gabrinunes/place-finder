import axios from 'axios'

const api =axios.create({
    baseURL:'https://api.mapbox.com/geocoding/v5'
})

export default api;