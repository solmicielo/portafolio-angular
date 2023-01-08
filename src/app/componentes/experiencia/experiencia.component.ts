import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditExperienciaComponent } from 'src/app/add-edit-componentes/add-edit-experiencia/add-edit-experiencia.component';
import { Persona } from 'src/app/model/persona';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experienciaList:any;

  constructor(private _portafolioService:PortafolioService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPortafolio();
  }
  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.experienciaList= data.experiencias;
      console.log(data);})
      ;
  }


  addEditExperiencia(){
    const dialogRef = this.dialog.open(AddEditExperienciaComponent, {
      width:"650px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}
