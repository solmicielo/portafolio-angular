import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from 'src/app/model/skill';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.css']
})
export class AddEditSkillsComponent implements OnInit {
  form: FormGroup;
  identificadorP!: number;  
  maxDate:Date;
  idSkill:number | undefined;
  loading:boolean = false;
  checkbox:boolean = false;
  operacion:string = 'Agregar ';
  appi:string = this._portafolioService.apiUrlSkills;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditSkillsComponent>,
    private dateAdapter: DateAdapter<Date>,
    private fb : FormBuilder,
    private _portafolioService:PortafolioService,
    private _metodoService: MetodosService) { 
      this.maxDate = new Date();
      this.form= this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],        
        porcentaje:['',[Validators.pattern("^[0-9]*$"),Validators.min(1),Validators.max(100)]],              
      })
      this.idSkill = data.id;
    }

  ngOnInit(): void {
    this.idPersona();
    this.esEditar(this.idSkill);
  }

  esEditar(id:number| undefined){
    if(id !== undefined){
      this.operacion = 'Editar ';
      this.buscarSkill(id);
    }
  }
  buscarSkill(id:number){
    this._portafolioService.buscarItem(id, this.appi).subscribe(data =>{
      this.form.patchValue({
        id:data.id,
        nombre:data.nombreSkill,
        porcentaje: data.porcentaje,
        
      });
    });
  }
  idPersona():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.identificadorP = data.id;
      })
      
  }
  

  cancelar() {
    this.dialogRef.close();
  }

  addEditSkill() {
    this.idPersona();
    const skill: Skill = {
      id:this.idSkill,
      nombreSkill: this.form.get('nombre')?.value,
      porcentaje: this.form.get('porcentaje')?.value,      
      persona:this.identificadorP
      
    };
    console.log(skill);
    this.loading = true;

    if(this.idSkill == undefined){      
      //Es agregar
      this._portafolioService.NuevoItem(skill, this.appi).subscribe(()=>{  
        this._metodoService.mensaje('Nueva Skill agregada con Exito !');       
      })
    }else {
      // es Editar
      this._portafolioService.editarItem(skill, this.appi).subscribe(data => {        
        this._metodoService.mensaje('Skill editada con Exito !');
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

}
