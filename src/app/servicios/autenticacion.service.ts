import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private myAppUrl:string;
  private miApiUrl:string;   
  currentUserSubject: BehaviorSubject<any>;
  private usuario!: string | null;
  estaLogueado:boolean = false;
  

  constructor(private http:HttpClient) { 
    console.log("El servicio de autenticación está correindo");
    this.myAppUrl = 'https://desperate-edith-solmicielo.koyeb.app/';
    this.miApiUrl = 'auth/login'    
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
  }

  IniciarSesion(usuario: Usuario):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.miApiUrl}`, usuario)
    
  }

  usuarioActual(){
    this.usuario = localStorage.getItem('token');
    if (this.usuario == null){
      this.estaLogueado = false;
    }else{
      this.estaLogueado = true;
    }    
    return this.estaLogueado;
    
  }

  
}
