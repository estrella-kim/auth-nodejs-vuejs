import axios from 'axios';

const $http = axios;
const STATIC_API = 'http://localhost:8000/api';

export default function (param, callback) {
    $http.post(STATIC_API + '/todo', param)
        .then(callback)
        .catch(function(error) {
            console.log(error);
        })

}