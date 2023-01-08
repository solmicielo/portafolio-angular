import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditFormacionComponent } from 'src/app/add-edit-componentes/add-edit-formacion/add-edit-formacion.component';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  formacionList:any;

  constructor(private _portafolioService:PortafolioService, public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPortafolio();
    
  }

  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.formacionList= data.educacion;
      console.log(data);})
      ;
  }

  borrarEstudio(id:number){
    this._portafolioService.borrarEstudio(id).subscribe(()=>{
      this.getPortafolio();
      this.mensajeExito();
    });
  }
  
  mensajeExito(){
    this._snackBar.open('Estudio eliminado con Exito!', '',{
      duration: 2000
    });
  }

  addEditFormacion(id?:number){
    console.log(id);
    const dialogRef = this.dialog.open(AddEditFormacionComponent, {      
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
