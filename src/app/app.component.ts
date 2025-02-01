import { Component } from '@angular/core';
import { TodosComponent } from "./components/todos/todos.component";


@Component({
  selector: 'app-root',
  imports: [
    TodosComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
