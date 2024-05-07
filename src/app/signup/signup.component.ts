import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
  username = ""
  email = "";
  password = "";
  displayText = "";

  signup(){
    this.displayText = this.username + this.email + this.password;
  }
}
