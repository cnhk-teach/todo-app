import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations:[
    trigger('fadein',[
      transition('void=>*',[
        style({opacity: 0}),
        animate('1200ms', style({opacity: 1})),
      ])
    ])
  ]
})

export class LoginComponent {
  constructor (private http: HttpClient, private router: Router) {}
  
  email = "";
  password = "";

  login(){
    this.http.post("http://localhost:2323/login", {
      email: this.email, password: this.password
    }).subscribe((res: any)=>{
      if(res.token){
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todo'])
      }
    },
    (error: any) => {
        console.log(error.error);
        alert(error.error.msg != undefined ? error.error.msg : error.error.err);
    })
  }
}
