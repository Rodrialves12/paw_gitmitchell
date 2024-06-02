import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityRestService } from '../../services/entity-rest.service';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityComponent implements OnInit {
entity: any;
images: any;
constructor(private rest: EntityRestService, private route: ActivatedRoute, private router: Router, private http:HttpClient) { 

}

  ngOnInit(): void {
  this.rest.getEntities().subscribe((data: {}) => {
    console.log(data);
    this.entity = data;
  });
}

view(id:any) {
  this.router.navigate(['/entity-show/'+id]);
}

}
