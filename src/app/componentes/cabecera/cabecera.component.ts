import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  perfil:any ={};

  constructor(private _portafolioService:PortafolioService) {
    this.getPortafolio();
  }

  ngOnInit(): void {
    
  }

  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.perfil= data;
      return this.perfil;
      })
      ;
  }

}
