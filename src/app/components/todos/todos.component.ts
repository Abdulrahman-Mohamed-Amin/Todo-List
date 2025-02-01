import { Todo } from './../../interfaces/todo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos:Todo[] = []
  todosOrg:Todo[] = []
  newTodo:Todo = {} as Todo
  empty:boolean = false
  check:boolean = false
  constructor(private _todoService:TodoService){}
  ngOnInit(): void {
    this.getAllTodos()
    this.checkTodos()
  }
  getAllTodos(){
    this._todoService.getTodos().subscribe({
      next: (res) =>{
        this.todos = res
        this.todosOrg = this.todos        
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }

  add(){
    const newTodo1 = {id:this.newTodo.id , title:this.newTodo.title , complete:false }
    this.newTodo = newTodo1
    
    if(newTodo1.title !== undefined && newTodo1.title !== null && newTodo1.title !== ''){
      this.empty = false
      this._todoService.addTodo(newTodo1).subscribe({
        next:(res) =>{
          this.todos.push(res)
          newTodo1.title = ''
        this.checkTodos()
        }
      })
    }else{
      this.empty = true
    }

  }
  update(todo:Todo){
    todo.complete = !todo.complete
  
    this._todoService.updateTodo(todo).subscribe()
  }
  delete(todoId:string){
    this._todoService.deleteTodo(todoId).subscribe({
      next:(res) =>{
        this.todos = this.todos.filter(todo => todo.id !== todoId)
        this.todosOrg = this.todosOrg.filter(todo => todo.id !== todoId)
        this.checkTodos()
      }
    })
  }
  clear(){
    for (let i = 0; i < this.todos.length; i++) {
      this._todoService.deleteTodo(this.todos[i].id).subscribe()
    }
    this.todos = []
    this.todosOrg = []
    this.checkTodos()
  }

  checkTodos(){
    if(this.todos.length == 0){
      this.check = true 
    }else{
      this.check = false
      
    }
    if(this.todosOrg.length == 0){
      this.check = true 
    }else{
      this.check = false
      
    }
  }

  complete(){
    this.todosOrg = this.todos
    this.todosOrg = this.todosOrg.filter(todo => todo.complete === true)
    this.checkTodos() 
  }
  pending(){
    this.todosOrg = this.todos
    this.todosOrg = this.todosOrg.filter(todo => todo.complete == false)
    this.checkTodos()
  }
  all(){
    this.todosOrg = this.todos
    this.checkTodos()
  }
}
