import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  perfil:any= {};
  estaLogueado = this.auth.elUsuarioEstaLogueado;

  constructor(private _portafolioService:PortafolioService, private ruta:Router,private auth: AutenticacionService) { }

  ngOnInit(): void {
    
  }

  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.perfil= data;
      })
      ;
  }

  logIn(){
    this.ruta.navigate(['/login'])
  }

  logOut(){
    localStorage.removeItem('token');
    this.auth.elUsuarioEstaLogueado = false;
  }

}
