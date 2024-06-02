import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity'; 

const endpoint = 'http://localhost:3000/api/entity';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class EntityRestService {

  constructor(private http: HttpClient) { }

  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpoint);
  }

  getEntity(id: string): Observable<Entity> {
    return this.http.get<Entity>(endpoint+'show/'+id);

  }
  
}
