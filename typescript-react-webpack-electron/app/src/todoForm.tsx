/// <reference path="../typings/react/react-dom.d.ts" />
/// <reference path="../typings/react/react.d.ts" />
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Main} from './main';

interface ITodo {
    text: string;
    id: string;
}
export interface ITodoFormState {
    error: string;
}

export interface ITodoFormProps {
onTodoAdd: (text: string) => void;
onTodoUpdate: (todo: ITodo) => void;
changeText: (text: string) => void;
text: string;
isEdit: string;
}
export class TodoForm extends React.Component<ITodoFormProps, ITodoFormState> {

    state: ITodoFormState = {  
        error: ""
    }

    constructor () {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

	onChange(e:any){
		this.props.changeText(e.target.value);
	}

	onSubmit(e:any){
		e.preventDefault();
		var text = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["text"]).value.trim();

        if(!text){
            this.setState({error: "Please enter a todo"});
            return;
        }

        this.setState({error: ""});

		if (this.props.isEdit) {
  		var updatedTodo = {
            id: this.props.isEdit,
            text:text
            }
         this.props.onTodoUpdate(updatedTodo);        
		} else {
			
			this.props.onTodoAdd(text);			
		}		 	
	}

    renderError(){
        if (!this.state.error) {return null;}
        else{
            return <div style={{color: "lightcoral"}}>{this.state.error}</div>;
        }
    }

    render () {
        return (
           <div >
                <form onSubmit={this.onSubmit}>
                	<div className="form-group">
                		<label>Todo List </label>
                		<input type="text"
                		ref="text" 
                        placeholder="Input new todo here..."
                		value={this.props.text} 
                		onChange={this.onChange} className="form-control"/>
                	</div>
                    {this.renderError()}
                </form>
                
            </div>
        );
    }
}