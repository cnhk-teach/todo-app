import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
    email = "";
    password = "";
    displayText = "";

    login(){
      this.displayText = this.email + this.password;
    }
}
