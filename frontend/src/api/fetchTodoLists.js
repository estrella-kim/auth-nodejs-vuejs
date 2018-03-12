import axios from 'axios';

const $http = axios;
const STATIC_API = 'http://localhost:8000/api';

export default function (callback) {
    $http.get(STATIC_API + '/todo')
        .then(callback)
        .catch(function(error) {
            console.log(error);
        })

}