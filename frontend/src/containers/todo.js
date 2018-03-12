import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import { createStore } from 'redux';
import { fetchTodoLists, registerTodoLists, deleteTodoLists, updateTodoLists } from '../api';
import axios from 'axios';
import { TodoList } from '../components';
import { Checkbox, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import './todo.css';


const $http = axios;
//const store = createStore(TodoList);

export class Todo extends React.Component{
    constructor (nextState) {
        super();
        this.lists = [];
        this.state = {
            text : '',
            lists : this.lists,
            filterType : 'all'
        }
    }
    componentDidMount () {
        let getLists = () => {
            let _this = this;
            fetchTodoLists(function (res) {
                res.data.response.forEach(function (value, index) {
                    const list = {
                        index : value.index,
                        text : value.todo,
                        status : value.isDone
                    }
                    _this.lists.push(list);
                });
                _this.setState({
                    lists : _this.lists
                })
            })
        }
        getLists();
    }
   /* shouldComponentUpdate (nextState) {
            for(let i = 0; i < this.state.lists.length; i++ ) {
                return (
					nextState.lists[i].status !== this.state.lists[i].status
                )
            };
    }*/
    registerList (e) {
        const _this = this;

        if(e) {
            e.preventDefault();
        }
        const obj = {
            text : this.state.text,
            status : 0,
            editValue : false
        }
        this.lists.push(obj);
        registerTodoLists(obj, function(res){
            console.log(res);
            _this.setState({
                text : ''
            })
            if(_this.state.filterType !== 'done') {
                _this.setState({
                    lists : _this.lists
                })
            }
        });
    }
    filterLists (e) {
        var filterType = '';
        if(e) {
			filterType = e.target.value;
        }else{
			filterType = this.state.filterType
        }
        const arr = [];
        this.setState({
            lists : this.lists,
            filterType : filterType
        })
        if(filterType === 'todo'){
            this.lists.forEach(function(value){
                if(value.status === 0) {
                    arr.push(value);
                }
            })
            this.setState({
                lists : arr
            })
        }else if(filterType === 'done') {
            this.lists.forEach(function(value){
                console.log(value);
                if(value.status === 1) {
                    arr.push(value);
                }
            })
            this.setState({
                lists : arr
            })
        }
    }
    getText (e) {
        const text = e.target.value;
        this.setState({
            text : text
        })
    }
    changeStatus (list, index) {
        let arr = this.state.lists;
        list.status = list.status === 1 ? 0 : 1;
        arr[index].status = list.status;
        this.setState({
            lists : arr
        });
        updateTodoLists( { status : list.status, index : list.index }, function(res){
            console.log(res);
        });
        this.filterLists();
    }

    delete (list, index) {
        const _this = this;
        delete this.lists[index];
        console.log(list.index);
        deleteTodoLists( {params: {index: list.index}}, function(res){
            console.log(res);
            _this.setState({
                lists : _this.lists
            })
            _this.filterLists();
        });
    }
    edit(index) {
        this.lists[index].editValue = !this.lists[index].editValue;
        this.setState({
            lists : this.lists
        })
    }
    editText(event, index) {
        this.lists[index].text = event.target.value;
        this.setState({
            lists : this.lists
        })
    }
    registerEdited(event, list) {
        const _this = this;
        event.preventDefault();
        updateTodoLists( { index : list.index, text : list.text }, function(res){
            console.log(res);
            list.editValue = false;
            if(_this.filterType !== 'done') {
                _this.setState({
                    lists: _this.lists
                })
            }
        });
    }
    render () {
        return (
                <div className="wrap">
                    <div className="wrap__todo-wrap">
                        <div className="write-list">
                            <form onSubmit={ (e) => this.registerList(e)}>
                                <Input type="text" onChange={(e) => this.getText(e) } value={this.state.text}/>
                                <Icon type="edit" onClick={ (e) => this.registerList(e) }/>
                            </form>
                        </div>
                        <ul className="filter-wrap">
                            <li><label><input type="radio" name="todo-list" value="all" defaultChecked ={ this.state.filterType} onChange={(e) => this.filterLists(e)}/>all</label></li>
                            <li><label><input type="radio" name="todo-list" value="todo" onChange={(e) => this.filterLists(e)}/>todo</label></li>
                            <li><label><input type="radio" name="todo-list" value="done" onChange={(e) => this.filterLists(e)}/>done</label></li>
                        </ul>
                        <div className="lists-wrap">
                            <ul>
                                { this.state.lists.map((v, i) => (
                                    <li key={i}>
                                        <Checkbox checked={v.status} onChange={ () => this.changeStatus(v, i) }></Checkbox>
                                        { v.editValue ? (<form className="edit-wrap" onSubmit={(e) => this.registerEdited(e, v)}><Input value={v.text} size="small" onBlur={ () => this.edit(i) } onChange={(e) => this.editText(e, i)} /></form>)
                                            : (<span onDoubleClick={ () => this.edit(i)}>{v.index}{v.text}</span>) }
                                        <Icon type="close" onClick={ () => this.delete(v, i)}/>
                                    </li>)
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}
ReactDOM.render(<Todo/>, document.getElementById('todo'));

