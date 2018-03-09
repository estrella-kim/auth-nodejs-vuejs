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
        let arr = [ req.text, req.status];
        return connection.query( 'insert into todos(todo, isDone) values(?,?)', arr, callback);
    },
    updateLists : function(req, callback) {
        if(req.text) {
            let arr = [req.text, req.index];
            return connection.query('update todos set todo = ? where `index` = ?' , arr , callback);
        }
        let arr = [req.status, req.index];
        return connection.query('update todos set isDone = ? where `index` = ?' , arr , callback);
    },
    deleteLists : function(req, callback) {
        return connection.query('delete from todos where `index` = ?', req.index, callback );
    }
};

module.exports = authModel;
