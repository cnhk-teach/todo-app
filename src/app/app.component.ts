import { Component, OnInit } from '@angular/core';
import {  Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'todo-app';

  constructor (private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.router.navigate(['/todo'])
    } else {
      this.router.navigate(['login'])
    }
  }
}
