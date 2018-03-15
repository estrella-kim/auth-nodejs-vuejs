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

export class Todo extends React.Component{
    constructor () {
        super();
        this.lists = [];
        this.state = {
            text : '',
            lists : this.lists,
            filterType : 'all',
            editValue : false
        }
    }
    componentDidMount () {
        this.getLists();
    }
    getLists () {
        let _this = this;
        fetchTodoLists(function (res) {
            let arr = [];
            res.data.response.forEach(function (value, index) {
                const list = {
                    index : value.index,
                    text : value.todo,
                    status : value.isDone,
                    editValue : false
                }
                arr.push(list);
            });
            _this.lists = arr;
            _this.setState({
                lists : _this.lists
            })
        })
    }
    registerList (e) {
        const _this = this;

        if(e) {
            e.preventDefault();
        }
        const param = {
            text : this.state.text,
            status : 0,
            editValue : false
        };
        registerTodoLists(param, function(res){
            console.log(res)
            let registeredList = {
                index : res.data.response.insertId,
                text : param.text,
                status : 0
            }
            let presentLists = _this.state.lists;
            presentLists.push(registeredList);
            _this.setState({
                text : '',
                lists : presentLists
            });
            _this.doFilter();
        });
    }
    selectFilter (e) {
        this.state.filterType = e.target.value;
        this.doFilter();
    }
    updateState (filterType) {
        const arr = [];
        this.lists.forEach(function(value){
            if(value.status === filterType) {
                arr.push(value);
            }
        })
        this.setState({
            lists : arr
        })
    }
    doFilter () {
        let filterType = this.state.filterType;
        this.setState({
            lists : this.lists,
            filterType : filterType
        });
        switch(filterType) {
            case 'todo' :
                this.updateState(0);
                break;
            case 'done' :
                this.updateState(1);
                break;
        };
    }
    getText (e) {
        const text = e.target.value;
        this.setState({
            text : text
        })
    }
    changeStatus (list, index) {
        const param = { index : list.index };
        let arr = this.state.lists;
        list.status = list.status === 1 ? 0 : 1;
        param.status = list.status;
        arr[index].status = list.status;

        updateTodoLists( param, function(res){
            console.log(res);
            this.setState({
                lists : arr
            });
        });

        this.doFilter();
    }

    delete (list, index) {
        const _this = this;
        this.lists.splice(index, 1);
        console.log(list.index);
        console.log( this.lists);
        deleteTodoLists( {params: {index: list.index}}, function(res){
            console.log(res);
            _this.setState({
                lists : _this.lists
            });
            _this.doFilter();
        });
    }
    edit(value, index) {
        let wholeLists = this.state.lists;
        wholeLists[index].editValue = !value.editValue;
       // this.lists[index].editValue = !this.lists[index].editValue;
        this.setState({
            lists : wholeLists
        })
    }
    editText(event, index) {
        let wholeLists = this.state.lists;
        wholeLists[index].text = event.target.value;
        //this.lists[index].text = event.target.value;
        this.setState({
            lists : wholeLists
        })
    }
    registerEdited(event, list, index) {
        const _this = this;
        event.preventDefault();
        let param = {
            index : list.index,
            text : list.text
        };
        updateTodoLists( param, function(res){
            console.log(res);
            let presentLists = _this.state.lists;
            presentLists[index].editValue = false;
            _this.setState({
                lists : presentLists
            })
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
                            <li><label><input type="radio" name="todo-list" value="all" defaultChecked ={ this.state.filterType} onChange={(e) => this.selectFilter(e)}/>all</label></li>
                            <li><label><input type="radio" name="todo-list" value="todo" onChange={(e) => this.selectFilter(e)}/>todo</label></li>
                            <li><label><input type="radio" name="todo-list" value="done" onChange={(e) => this.selectFilter(e)}/>done</label></li>
                        </ul>
                        <div className="lists-wrap">
                            <ul>
                                { this.state.lists.map((v, i) => (
                                    <li key={i}>
                                        <Checkbox checked={v.status} onChange={ () => this.changeStatus(v, i) }></Checkbox>
                                        { v.editValue ? (<form className="edit-wrap" onSubmit={(e) => this.registerEdited(e, v, i)}><Input value={v.text} size="small" onBlur={ () => this.edit(v, i) } onChange={(e) => this.editText(e, i)} /></form>)
                                            : (<span onDoubleClick={ () => this.edit(v, i)}>{v.index}{v.text}</span>) }
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

