import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditFormacionComponent } from 'src/app/add-edit-componentes/add-edit-formacion/add-edit-formacion.component';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { MetodosService } from 'src/app/servicios/metodos.service';
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
      this.formacionList= data.educacion;
      })
      
  }

  borrarEstudio(id:number){
    this._portafolioService.borrarItem(id, this.appi).subscribe(()=> {
      this.getPortafolio();
      this._metodosservice.mensaje('Estudio eliminado con Exito!', 2);
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
        setTimeout(() => {this.getPortafolio();}, 4000)
      }           
    });
  }

}
