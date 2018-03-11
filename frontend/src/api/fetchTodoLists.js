export default function (callback) {
    $http.get('http://localhost:8000/todo')
        .then(function (res) {
            res.data.forEach(function (value, index) {
                const list = {
                    index : value.index,
                    text : value.todo,
                    status : value.isDone
                }
                _this.lists.push(list);
            })
            _this.setState({
                lists : _this.lists
            })
        })
        .catch(function(error) {
            console.log(error);
        })

}