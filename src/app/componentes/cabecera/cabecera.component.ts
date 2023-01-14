import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditPersonaComponent } from 'src/app/add-edit-componentes/add-edit-persona/add-edit-persona.component';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  perfil:any ={};
  loading:boolean = false;

  constructor(
    private _portafolioService:PortafolioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar ) {
    this.getPortafolio();
  }

  ngOnInit(): void {
    this.getPortafolio();
    
  }

  getPortafolio():void{
    this.loading = true;
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.loading = false;
      this.perfil= data;
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
        this.getPortafolio();
      }           
    });
  }

}
