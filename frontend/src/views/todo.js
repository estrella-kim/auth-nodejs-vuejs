import React from 'react';
import ReactDOM from 'react-dom';
import '../stylesheets/todo.css';

export class Todo extends React.Component{
    render () {
        return (
            <div>
                <div className="write-list">
                    <form>
                        <input type="text"/>
                    </form>
                </div>
                <ul className="filter-wrap">
                    <li><input type="radio"/>todo</li>
                    <li><input type="radio"/>doing</li>
                    <li><input type="radio"/>done</li>
                </ul>
                <div className="lists-wrap">
                    <ul>
                        <li></li>gu
                    </ul>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Todo/>, document.getElementById('todo'));