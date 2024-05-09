import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  animations:[
    trigger('fadein',[
      transition('void=>*',[
        style({opacity: 0}),
        animate('1200ms', style({opacity: 1})),
      ])
    ])
  ]
})

export class TodoComponent implements OnInit {

  todos : any;
  completedTodo = 0;
  task = '';
  isProgress = true;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.start()
  }

  start(){
    this.task = ""
    this.http.get('http://localhost:2323/todo/view',{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .subscribe((data: any) => {
        this.completedTodo = data.filter((todo: any) => todo.completedAt != null).length
        this.todos = data
        this.isProgress=false
    })
  }

  add(){
    this.isProgress=true
    this.http.post(`http://localhost:2323/todo/add/`,
    {
      task: this.task
    },{ 
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`} 
    }).subscribe(() => this.start())
  }

  update(todoId: String) {
    this.isProgress=true
    this.http.patch(`http://localhost:2323/todo/completed/${todoId}`,{ completedAt: null }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .subscribe(() => this.start())
  }

  delete(todoId: String) {
    this.isProgress=true
    this.http.delete(`http://localhost:2323/todo/delete/${todoId}`,{ headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .subscribe(() => this.start())
  }

  complete(todoId: String) {
    this.isProgress=true
    this.http.patch(`http://localhost:2323/todo/completed/${todoId}`,{ completedAt: Date.now() }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
      .subscribe(() => this.start())
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
