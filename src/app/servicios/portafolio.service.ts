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
   apiUrlEstudio: string;
  

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
  //Eliminar 
  public borrarItem(id:number, apiUrlItem :string):Observable <void>{
    return this.http.delete<void>(this.myAppUrl + apiUrlItem + `delete/${id}`);
  }
  //Crear 
  public NuevoItem(objeto:any, apiUrlItem :string):Observable<any> {
    return this.http.post<any>(this.myAppUrl + apiUrlItem +'new', objeto);
  }
  //Buscar 
  public buscarItem(id:number, apiUrlItem :string):Observable<Formacion> {
    return this.http.get<Formacion>(this.myAppUrl + apiUrlItem +`buscar/${id}`);
  }

  //Editar 
  public editarItem(objeto:any, apiUrlItem :string):Observable<void>{
    return this.http.put<void>(this.myAppUrl + apiUrlItem + 'editar', objeto);
  }
}

