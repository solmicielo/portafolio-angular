import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsProfesional:any;
  skillsTecnico:any;

  constructor(private datosPortafolio:PortafolioService) {      

   }

  ngOnInit(): void {   
    this.datosPortafolio.obtenerDatos().subscribe(data => {
      this.skillsProfesional= data.skills.profesional;
      this.skillsTecnico= data.skills.tecnicas;
    });



   
  }

}
