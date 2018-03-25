import $http from './api_core';

export function fetchTodoLists () {
    return  $http.get('/todo');
}

export function updateTodoLists(param){
    return $http.put('/todo', param);
}

export function deleteTodoLists(param) {
    return $http.delete('/todo', param)
}

export function addTodoLists(param) {
    return $http.post('/todo', param);
}