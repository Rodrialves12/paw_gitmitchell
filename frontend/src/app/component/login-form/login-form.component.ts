import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthResService } from '../../services/auth-res.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent implements OnInit {

  @Input() user: User;
  message:any;

  constructor(private router: Router, private rest: AuthResService) { 
    this.user= new User();
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log("metodo esta a ser chamado");
    this.rest.login(this.user).subscribe({
      next: (user) => {
        console.log(user);
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('role', user.role);
          localStorage.setItem('id', user.id);
          this.router.navigate(['/']);
        } else {
          this.message = 'Erro no login!';
          
          this.router.navigate(['/test']);
        }
      },error: (error) => {
        console.log(error);
        
        this.router.navigate(['/test2']);
      }, complete: () => {console.log("aqui");}
    });

  }

}



