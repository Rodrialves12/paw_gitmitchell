import { Component, Input, OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResService } from '../../services/auth-res.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil', 
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  @Input() user?:User;

  constructor(private router: Router, private authService: AuthResService, private route: ActivatedRoute) { 
   
  }
  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.authService.getUser(idTemp).subscribe((data : User)=>{
    this.user = data;
    });
  }

}
