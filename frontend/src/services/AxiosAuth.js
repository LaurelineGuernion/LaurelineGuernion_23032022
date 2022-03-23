import axios from "axios";
import router from "../router";
export const AxiosAuth = axios.create()

AxiosAuth.interceptors.response.use(
    function (response) {
        //console.log(response)
        // continue sending response to the then() method
        return Promise.resolve(response)
    },
    function (error) {
        // check if unauthorized error returned
        if (error.response.status === 401 || error.response.status === 404) {
        //console.log('Unauthorized access')
        //console.log(error.response)
        router.replace({ name: 'Connexion' })
        }
        // request is rejected and will direct logic to the catch() method
        return Promise.reject(error)
    })