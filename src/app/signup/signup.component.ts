import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations:[
    trigger('fadein',[
      transition('void=>*',[
        style({opacity: 0}),
        animate('1200ms', style({opacity: 1})),
      ])
    ])
  ]
})

export class SignupComponent {
  constructor (private http: HttpClient, private router: Router){}

  username = ""
  email = "";
  password = "";

  signup(){
    this.http.post('http://localhost:2323/signup', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe((res: any)=>{
      if(res.msg){
        alert(res.msg)
        this.router.navigate(['/login'])
      }
    },
    (error: any) => {
      alert(error.error.msg  != undefined ? error.error.msg : error.error.err)
    })
  }
}
