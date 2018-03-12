const todoModels = require('../../models/todo/index');


exports.getLists = (req, res, next) => {
    todoModels.getLists(function(error, results, fields) {
		let responseObj = {
			"status" : 200,
			"error" : null,
			"response" : results
		};
        if(error) {
		    responseObj["error"] = error
        }
        res.send(JSON.stringify(responseObj));
    });
}
exports.getListsByIndex = (req, res) => {
    todoModels.getListsByIndex(req.params.id , function(error, results) {
		let responseObj = {
			"status" : 200,
			"error" : null,
			"response" : results
		};
		if(error) {
			responseObj["error"] = error
		}
		res.send(JSON.stringify(responseObj));
    })
}
exports.insertLists = (req, res, next) => {
	let param = [ req.body.text, req.body.status];
    todoModels.insertLists(param, function(error, results) {
		let responseObj = {
			"status" : 200,
			"error" : null,
			"response" : results
		};
		if(error) {
			responseObj["error"] = error
		}
		res.send(JSON.stringify(responseObj));
    })
}
exports.updateLists = (req, res) => {
	if (req.body.text) {
        let param = [req.body.text, req.body.index];
        todoModels.updateTodoLists(param, function(error, results) {
            let responseObj = {
                "status" : 200,
                "error" : null,
                "response" : results
            };
            if(error) {
                responseObj["error"] = error
            }
            res.send(JSON.stringify(responseObj));
        })
	}
	if(req.body.status) {
        let param = [req.body.status, req.body.index];
        todoModels.updateListStatus(param, function(error, results) {
            let responseObj = {
                "status" : 200,
                "error" : null,
                "response" : results
            };
            if(error) {
                responseObj["error"] = error
            }
            res.send(JSON.stringify(responseObj));
        })
	}

}
exports.deleteLists = (req, res) => {
    todoModels.deleteLists(req.query, function(error, results) {
		let responseObj = {
			"status" : 200,
			"error" : null,
			"response" : results
		};
		if(error) {
			responseObj["error"] = error
		}
		res.send(JSON.stringify(responseObj));
    })
}