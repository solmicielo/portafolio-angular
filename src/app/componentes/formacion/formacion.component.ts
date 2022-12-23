import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFormacionComponent } from 'src/app/add-edit-componentes/add-edit-formacion/add-edit-formacion.component';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.css']
})
export class FormacionComponent implements OnInit {
  formacionList:any;

  constructor(private datosPortafolio:PortafolioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos().subscribe(data => {
      this.formacionList= data.formacion;
    });
  }

  addEditFormacion(){
    const dialogRef = this.dialog.open(AddEditFormacionComponent, {
      width:"550px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}
