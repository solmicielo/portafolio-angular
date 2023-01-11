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
  loading:boolean = false;
  appi:string = this._portafolioService.apiUrlEstudio;
  

  constructor(private _portafolioService:PortafolioService, public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPortafolio();
    
  }

  getPortafolio():void{
    this.loading = true;
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.loading = false;
      this.formacionList= data.educacion;
      })
      
  }

  borrarEstudio(id:number){
    this._portafolioService.borrarItem(id, this._portafolioService.apiUrlEstudio).subscribe(()=>{
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
