import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditProyectosComponent } from 'src/app/add-edit-componentes/add-edit-proyectos/add-edit-proyectos.component';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectosList:any;
  loading:boolean = false;
  appi:string = this._portafolioService.apiUrlProyectos;
  estaLogueado:boolean = this.auth.usuarioActual();

  constructor(
    private _portafolioService:PortafolioService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _metodosservice: MetodosService,
    private auth: AutenticacionService) { }

  ngOnInit(): void {
    this.getPortafolio();
    this.auth.usuarioActual();
  }

  getPortafolio():void{
    this.loading = true;
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.loading = false;
      this.proyectosList= data.proyectos;
      });
      
  }

  borrarProyecto(id:number){
    this._portafolioService.borrarItem(id, this.appi).subscribe(()=> {
      this.getPortafolio();
      this._metodosservice.mensaje('Proyecto eliminado con Exito!', 2);
    });
  }

  addEditProyecto(id?:number){
    const dialogRef = this.dialog.open(AddEditProyectosComponent, {
      width:"650px",
      disableClose: true,
      data:{ id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPortafolio();
      };      
    });
  }

}
