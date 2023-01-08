import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../model/persona';
import { Formacion } from '../model/formacion';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {
  private myAppUrl: string;
  private apiUrlPersona: string;
  private apiUrlEstudio: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.apiUrlPersona = 'persona/buscar/1';
    this.apiUrlEstudio = 'formacion/';
  }
  //Obtener datos persona portafolio
  public obtenerDatos(): Observable <any> {
    return this.http.get(this.myAppUrl + this.apiUrlPersona );
  }
  //--------------Endpoints--Formacion---------------------------------
  //Eliminar Formacion por id
  public borrarEstudio(id:number):Observable <void>{
    return this.http.delete<void>(this.myAppUrl + this.apiUrlEstudio + `delete/${id}`);
  }
  //Crear Formacion 
  public NuevaFormacion(formacion:Formacion):Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.apiUrlEstudio +'new',formacion);
  }
  //Buscar Formacion
  public buscarFormacion(id:number):Observable<Formacion> {
    return this.http.get<Formacion>(this.myAppUrl + this.apiUrlEstudio +`buscar/${id}`);
  }

  //Editar Formacion
  public editarFormacion(formacion:Formacion):Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.apiUrlEstudio + 'editar',formacion);
  }
}

