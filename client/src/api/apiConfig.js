import axios from "axios"

const baseUrl = axios.create({
  baseURL: "http://localhost:4000/api"
})

export default baseUrl;