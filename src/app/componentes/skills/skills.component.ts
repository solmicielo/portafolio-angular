import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSkillsComponent } from 'src/app/add-edit-componentes/add-edit-skills/add-edit-skills.component';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsProfesional:any;
  skillsTecnico:any;

  constructor(private _portafolioService:PortafolioService, public dialog: MatDialog) {      

  }

  ngOnInit(): void {   
    this.getPortafolio();

  }

  getPortafolio():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.skillsProfesional= data.habilidades;
      this.skillsTecnico= data.skills;
      })
      ;
  }

  addEditSkill(){
    const dialogRef = this.dialog.open(AddEditSkillsComponent, {
      width:"650px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

}
