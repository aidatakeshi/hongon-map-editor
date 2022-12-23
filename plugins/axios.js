import axios from 'axios'
import config from '~/map.config.js'

export default axios.create({
    baseURL: config.API_URL,
})
