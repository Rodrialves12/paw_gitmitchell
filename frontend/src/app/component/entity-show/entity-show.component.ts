import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity } from '../../models/entity';
import { EntityRestService } from '../../services/entity-rest.service';

@Component({
  selector: 'app-entity-show',
  standalone: true,
  imports: [],
  templateUrl: './entity-show.component.html',
  styleUrl: './entity-show.component.css'
})
export class EntityShowComponent implements OnInit {

  @Input() entity?:Entity;

  constructor(private router: Router, private route: ActivatedRoute, private rest:EntityRestService ) { 
    
  }
  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getEntity(idTemp).subscribe((data : Entity)=>{
      this.entity = data;
    })
  }

  navigateToItems(): void{
    this.router.navigate(['/entity']);
  }

}
