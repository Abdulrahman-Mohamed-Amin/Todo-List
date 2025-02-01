import { Todo } from './../interfaces/todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url:string = 'http://localhost:3000/names'
  constructor(private http:HttpClient) { }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url)
  }

  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.url , todo)
  }
  deleteTodo(id:string){
    return this.http.delete(`${this.url}/${id}`)
  }
  updateTodo(todo:Todo):Observable<Todo>{
    return this.http.put<Todo>(`${this.url}/${todo.id}` , todo)
  }
  clearAll(){
    return this.http.delete(`${this.url}`)
  }
}
