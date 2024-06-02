import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthResService } from '../../services/auth-res.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  @Input() user: User;
  message:any;

  constructor(private router: Router, private rest:AuthResService) { 
    this.user= new User();
  } 

  ngOnInit(): void {
  }


  register(): void{
    if(this.user.name == null || this.user.name == ""){
      this.message = "User name is missing!!!"
    }else if(this.user.email == null || this.user.email == ""){
      this.message = "User email is missing!!!"
    }else if(this.user.password == null || this.user.password == ""){
      this.message = "User password is missing!!!"
    }else if(this.user.address == null || this.user.address == ""){
      this.message = "User address is missing!!!"
    }else if(this.user.location == null || this.user.location == ""){
      this.message = "User location is missing!!!"
    }else if(this.user.birthdate == null || this.user.birthdate == ""){
      this.message = "User birthdate is missing!!!"
    }else if(this.user.nif == null || this.user.nif <= 99999999 || this.user.nif >1000000000){
      this.message = "User nif is wrong. ex.[596251463]..!!!"
    }else if(this.user.cell == null || this.user.cell <= 900000000 || this.user.cell >1000000000){
      this.message = "User phonenumber is wrong. ex.[937756371]..!!!"
    }else{
      this.user.role == 'Donor',
      this.rest
      .register(this.user)
      .subscribe((data: User)=>{
        alert('User added!')
        this.router.navigate(['/']);
      });
    }
  }





  
}
