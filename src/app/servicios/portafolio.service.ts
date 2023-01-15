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
  private apiUrl: string;
  apiUrlEstudio: string;
  apiUrlExperiencia:string;
  apiUrlSkills:string;
  apiUrlHabilidades:string;
  apiUrlProyectos:string;
  apiUrlPersona: string;

  constructor(private http:HttpClient) {
    this.myAppUrl = 'https://backendportafoliosol.onrender.com/';
    this.apiUrl = 'persona/buscar/1';
    this.apiUrlPersona = 'persona/';
    this.apiUrlEstudio = 'formacion/';
    this.apiUrlExperiencia = 'experiencia/';
    this.apiUrlSkills = 'skill/';
    this.apiUrlHabilidades = 'habilidad/';
    this.apiUrlProyectos = 'proyecto/'; 

  }
  //Obtener datos persona portafolio
  public obtenerDatos(): Observable <any> {
    return this.http.get(this.myAppUrl + this.apiUrl );
  }
  //--------------Endpoints-----------------------------------
  //Eliminar 
  public borrarItem(id:number, apiUrlItem :string):Observable <void>{
    return this.http.delete<void>(this.myAppUrl + apiUrlItem + `delete/${id}`);
  }
  //Crear 
  public NuevoItem(objeto:any, apiUrlItem :string):Observable<any> {
    return this.http.post<any>(this.myAppUrl + apiUrlItem +'new', objeto);
  }
  //Buscar 
  public buscarItem(id:number, apiUrlItem :string):Observable<any> {
    return this.http.get<any>(this.myAppUrl + apiUrlItem +`buscar/${id}`);
  }

  //Editar 
  public editarItem(objeto:any, apiUrlItem :string):Observable<void>{
    return this.http.put<void>(this.myAppUrl + apiUrlItem + 'editar', objeto);
  }
}

