import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProyectosComponent } from 'src/app/add-edit-componentes/add-edit-proyectos/add-edit-proyectos.component';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectosList:any;

  constructor(private _portafolioService:PortafolioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPortafolio();
  }

  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.proyectosList= data.proyectos;
      console.log(data);})
      ;
  }

  addEditProyecto(){
    const dialogRef = this.dialog.open(AddEditProyectosComponent, {
      width:"650px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}
