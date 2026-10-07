import request from './request'

const BASE_URL = '/api/locations'

const getAllLocations = () => request(BASE_URL)

const getLocationById = (id) => request(`${BASE_URL}/${id}`)

export default {
  getAllLocations,
  getLocationById
}
