import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url="https://localhost:8080/persona";

  constructor(private http:HttpClient) { }

  public agregarPersona (persona:Persona):Observable<any>{
    return this.http.post(this.

  }




}
