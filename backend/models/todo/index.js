/**
 * @desc auth model
 */
const database = require('../index');
const connection = database.connection();

const authModel = { 
    getLists : function(callback) {
        return connection.query('select * from todos', callback);
    },
    getListsByIndex : function( req, callback) {
        return connection.query('SELECT *  FROM todos WHERE `index`=?', req, callback);
    },
    insertLists : function(req, callback) {
        return connection.query( 'insert into todos(todo, isDone) values(?,?)', req, callback);
    },
    updateListStatus : function(req, callback) {
        return connection.query('update todos set isDone = ? where `index` = ?' , req , callback);
    },
    updateTodoLists : function(req, callback) {
        return connection.query('update todos set todo = ? where `index` = ?' , req , callback);
    },
    deleteLists : function(req, callback) {
        return connection.query('delete from todos where `index` = ?', req.index, callback );
    }
};

module.exports = authModel;
