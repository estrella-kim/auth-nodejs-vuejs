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
    todoModels.insertLists(req.body, function(error, results) {
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
    todoModels.updateLists(req.body, function(error, results) {
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