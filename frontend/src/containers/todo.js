import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import { createStore } from 'redux';
import { fetchTodoLists, addTodoLists, deleteTodoLists, updateTodoLists } from '../api';
//import { TodoList } from '../components';
import { Checkbox, Icon, Input } from 'antd';
import 'antd/dist/antd.css';
import './todo.css';

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
        fetchTodoLists()
            .then( res => {
                _this.lists = res.data.response;

                _this.setState({
                    lists: _this.lists
                });
            });
    }
    registerList (e) {
        const _this = this;

        if(e) {
            e.preventDefault();
        }
        const param = {
            text : this.state.text,
            isDone : 0
        };
        addTodoLists(param)
            .then(res => {
                let registeredList = {
                    index: res.data.response.insertId,
                    todo: param.text,
                    isDone: 0
                };
                _this.lists.push(registeredList);
                _this.setState({
                    text: ''
                })
            });
    }
	selectFilter (e) {
		this.state.filterType = e.target.value;
	}
    updateState (filterType) {
       if(filterType) {
           this.setState({ lists : this.lists.filter( list => list.isDone === filterType ) });
       } else{
           this.setState({ lists : this.lists });
       }
    }
    doFilter () {
        let filterType = this.state.filterType;
        /*this.setState({
            lists : this.lists,
            filterType : filterType
        });*/
        switch(filterType) {
            case 'todo' :
                this.updateState(0);
                break;
            case 'done' :
                this.updateState(1);
                break;
        };
    }
   /*shouldComponentUpdate () {
       if(this.state.lists === this.lists) {
           return false;
        }
        return true;
   }
   componentWillUpdate() {
       console.log(1)
        //this.doFilter();
   }*/
    getText (e) {
        const text = e.target.value;
        this.setState({
            text : text
        })
    }
    changeStatus (list, index) {
        const param = { index : list.index };
        let arr = this.state.lists;
        list.isDone = list.isDone === 1 ? 0 : 1;
        param.isDone = list.isDone;
        arr[index].isDone = list.isDone;

        updateTodoLists(param)
            .then(res => {
            this.setState({
                lists : arr
            });
        });
    }

    delete (list, index) {
        const _this = this;
        this.lists.splice(index, 1);
        console.log(list.index);
        console.log( this.lists);
        deleteTodoLists( {params: {index: list.index}})
            .then(res => {
            console.log(res);
        });
    }
    edit(value, index) {
        let wholeLists = this.state.lists;
        wholeLists[index].editValue = !value.editValue;
        this.setState({
            lists : wholeLists
        })
    }
    editText(event, index) {
        let wholeLists = this.state.lists;
        wholeLists[index].todo = event.target.value;
        this.setState({
            lists : wholeLists
        })
    }
    registerEdited(event, list, index) {
        const _this = this;
        event.preventDefault();
        let param = {
            index : list.index,
            text : list.todo
        };
        updateTodoLists( param)
            .then(res => {
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
                            <li><label><input type="radio" name="todo-list" value="all" defaultChecked ={ this.state.filterType} onChange={(e) => this.selectFilter(e)} onClick= {this.updateState()}/>all</label></li>
                            <li><label><input type="radio" name="todo-list" value="todo" onChange={(e) => this.selectFilter(e)} onClick= {this.updateState(0)}/>todo</label></li>
                            <li><label><input type="radio" name="todo-list" value="done" onChange={(e) => this.selectFilter(e)} onClick= {this.updateState(1)}/>done</label></li>
                        </ul>
                        <div className="lists-wrap">
                            <ul>
                                { this.state.lists.map((v, i) => (
                                    <li key={i}>
                                        <Checkbox checked={v.isDone} onChange={ () => this.changeStatus(v, i) }></Checkbox>
                                        { v.editValue ? (<form className="edit-wrap" onSubmit={(e) => this.registerEdited(e, v, i)}><Input value={v.todo} size="small" onBlur={ () => this.edit(v, i) } onChange={(e) => this.editText(e, i)} /></form>)
                                            : (<span onDoubleClick={ () => this.edit(v, i)}>{v.index}{v.todo}</span>) }
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

