/// <reference path="../typings/react/react-dom.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";

interface ITodo {
    id: string;
    text: string;
}

export interface ITodoListState {}

export interface ITodoListProps {
key?: string;    
todos: ITodo[];
deleteTodo: (todo: ITodo) => void;
editTodo: (todo: ITodo) => void;
}

export class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  constructor () {
        super();
        this.onDelete = this.onDelete.bind(this);
        this.editTodo = this.editTodo.bind(this);       
    }

    onDelete(todo: ITodo){
        this.props.deleteTodo(todo);
    }

    editTodo(todo: ITodo){
        this.props.editTodo(todo);
    }

    render () {
        return (
            <ul className="list-group">
                {
                    this.props.todos.map(todo => {
                        return <li className="list-group-item" 
                        todo={todo} 
                        key={todo.id}>
                        {todo.text}
                        <button className="btn btn-xs pull-right" onClick={this.onDelete.bind(this, todo)}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                        <button className="btn btn-xs pull-right" onClick={this.editTodo.bind(this, todo)}>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </button>
                        </li>
                    })
                }
            </ul>
        );
    }
}