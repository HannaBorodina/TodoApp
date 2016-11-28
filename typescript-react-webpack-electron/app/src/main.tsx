/// <reference path="../typings/react/react-dom.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
import * as React from "react";
import axios, {AxiosResponse} from "axios";

import {TodoList} from './todoList';
import {TodoForm} from './todoForm';

interface ITodo {
id: string;
text: string;
}

export interface IMainState {
text?: string;
isEdit?: string;
todos?: ITodo[];
}

export interface IMainProps {}

export class Main extends React.Component<IMainProps, IMainState> {

 state: IMainState = {  
    text: "", 
    isEdit: "",
    todos: []
 }
  constructor () {
        super();
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
        this.handleTodoDelete = this.handleTodoDelete.bind(this);
        this.handleTodoEdit = this.handleTodoEdit.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    }

    componentWillMount(){
    axios.get('http://localhost:59152/api/values').then((response: AxiosResponse) => 
        {this.setState({todos: response.data});
    });
    }

    componentWillUpdate(){
       axios.get('http://localhost:59152/api/values').then((response: AxiosResponse) => 
            {this.setState({todos: response.data});
        }); 
    }

    uuid() : string {
      var uuid = '';
      uuid += new Date().getTime();
      return uuid;
    }

    handleTodoAdd(text: string){

         var newTodo = {
            id: this.uuid(),
            text:text
         }
         axios.post('http://localhost:59152/api/values', {id: newTodo.id, text: newTodo.text});
         this.setState({text: "", isEdit: ""});
    }

    handleTodoDelete(todo: ITodo){
        axios.delete('http://localhost:59152/api/values/' + todo.id);              
    }

    handleTodoEdit(todo: ITodo){
        this.setState({
            text: todo.text,
            isEdit: todo.id
        }); 
    }

        handleChangeText(text: string){
        this.setState({
            text: text            
        });                  
    }

    handleTodoUpdate(todo: ITodo){
        axios.put('http://localhost:59152/api/values/' + todo.id, {id:todo.id, text: todo.text}); 
        this.setState({text: "", isEdit: ""});              
    }

    render () {
        return (
            <div>
                <TodoForm 
                text={this.state.text}
                isEdit={this.state.isEdit}
                changeText={this.handleChangeText} 
                onTodoUpdate={this.handleTodoUpdate}   
                onTodoAdd={this.handleTodoAdd} />
                <TodoList todos={this.state.todos} 
                editTodo={this.handleTodoEdit}
                deleteTodo={this.handleTodoDelete} />
             </div>
        );
    }
}