import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditPersonaComponent } from 'src/app/add-edit-componentes/add-edit-persona/add-edit-persona.component';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  perfil:any ={};
  loading:boolean = false;
  estaLogueado:boolean = this.auth.usuarioActual();

  constructor(
    private _portafolioService:PortafolioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private auth: AutenticacionService ) {
    this.getPortafolio();
  }

  ngOnInit(): void {
    this.getPortafolio();
    this.auth.usuarioActual()
    
  }

  getPortafolio():void{
    this.loading = true;
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.loading = false;
      this.perfil= data;
      console.log(data.url_curriculum);
      
      
      //return this.perfil;
      })
      ;
  }

  EditPersona(id?:number){        
    const dialogRef = this.dialog.open(AddEditPersonaComponent, {      
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
