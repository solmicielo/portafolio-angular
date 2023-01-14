import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditExperienciaComponent } from 'src/app/add-edit-componentes/add-edit-experiencia/add-edit-experiencia.component';
import { Persona } from 'src/app/model/persona';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList:any;
  loading:boolean = false;
  appi:string = this._portafolioService.apiUrlExperiencia;

  constructor(
    private _portafolioService:PortafolioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _metodosservice: MetodosService) { }

  ngOnInit(): void {
    this.getPortafolio();
  }
  getPortafolio():void{
    this.loading = true;
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.loading = false;
      this.experienciaList= data.experiencias;
      })
  
  }

  borrarExperiencia(id:number){
    this._portafolioService.borrarItem(id, this.appi).subscribe(()=> {
      this.getPortafolio();
      this._metodosservice.mensaje('Estudio eliminado con Exito!',2);
    });
  }


  addEditExperiencia(id?:number){
    const dialogRef = this.dialog.open(AddEditExperienciaComponent, {
      width:"650px",
      disableClose: true,
      data:{ id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPortafolio();
      }            
    });
  }

}
