import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditHabilidadComponent } from 'src/app/add-edit-componentes/add-edit-habilidad/add-edit-habilidad.component';
import { AddEditSkillsComponent } from 'src/app/add-edit-componentes/add-edit-skills/add-edit-skills.component';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsProfesional:any;
  skillsTecnico:any;
  loading:boolean = false;
  appiSkill:string = this._portafolioService.apiUrlSkills;
  appiHabillidad:string = this._portafolioService.apiUrlHabilidades;

  constructor(
    private _portafolioService:PortafolioService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _metodosservice: MetodosService) {      

  }

  ngOnInit(): void {   
    this.getPortafolio();

  }

  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.loading = false;
      this.skillsProfesional= data.habilidades;
      this.skillsTecnico= data.skills;
      })
      ;
  }
  borrarSkill(id:number){
    this._portafolioService.borrarItem(id, this.appiSkill).subscribe(()=> {
      this.getPortafolio();
      this._metodosservice.mensaje('Habilidad Técnica eliminada con Exito!');
    });
  } 

  borrarHabilidad(id:number){
    this._portafolioService.borrarItem(id, this.appiHabillidad).subscribe(()=> {
      this.getPortafolio();
      this._metodosservice.mensaje('Habilidad Blanda eliminada con Exito!');
    });
  } 

  addEditSkill(id?:number){
    const dialogRef = this.dialog.open(AddEditSkillsComponent, {
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

  addEditHabilidad(id?:number){
    const dialogRef = this.dialog.open(AddEditHabilidadComponent, {
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
