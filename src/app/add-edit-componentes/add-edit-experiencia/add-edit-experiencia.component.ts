import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Experiencia } from 'src/app/model/experiencia';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-add-edit-experiencia',
  templateUrl: './add-edit-experiencia.component.html',
  styleUrls: ['./add-edit-experiencia.component.css']
})
export class AddEditExperienciaComponent implements OnInit {
  form: FormGroup;
  identificadorP!: number;  
  maxDate:Date;
  idExperiencia:number | undefined;
  loading:boolean = false;
  checkbox:boolean = false;
  operacion:string = 'Agregar ';
  appi:string = this._portafolioService.apiUrlExperiencia;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditExperienciaComponent>,
    private dateAdapter: DateAdapter<Date>,
    private fb : FormBuilder,
    private _portafolioService:PortafolioService,
    private _metodoService: MetodosService) { 
      this.maxDate = new Date();
      this.form= this.fb.group({
        puesto:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],
        empresa:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],
        fechaInicio:[null,Validators.required,],
        fechaFin:[null,],
        alPresente:[null,],
        descripcion:['',[Validators.required,Validators.minLength(10),Validators.maxLength(2500)]]        
      })
      this.idExperiencia = this.data.id;

    }

  ngOnInit(): void {
    this.idPersona();
    this.esEditar(this.idExperiencia);
  }

  esEditar(id:number| undefined){
    if(id !== undefined){
      this.operacion = 'Editar ';
      this.buscarExperiencia(id);
      
    }
  }

  buscarExperiencia(id:number){
    console.log("Esto es lo que pasa por id ", id);
    this._portafolioService.buscarItem(id, this.appi).subscribe(data =>{
      this.form.patchValue({
        id:data.id,
        puesto:data.nombrePuesto,
        empresa: data.nombreEmpresa,
        fechaInicio:new Date (data.fechaInicio),
        fechaFin:new Date (data.fechaFin),
        alPresente:data.esTrabajoActual,
        descripcion:data.descripcion
      });
    });
  }
  
  idPersona():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.identificadorP = data.id;
      })
      ;
  }
  ObtenerCheckbox():void{
    if(this.form.get('alPresente')?.value){
      this.checkbox = true;
    }
    else{
      this.checkbox = false};
  }

  cancelar() {
    this.dialogRef.close();
  }

  addEditExperiencia() {
    this.idPersona();
    this.ObtenerCheckbox();

    const experiencia: Experiencia = {
      id:this.idExperiencia ,
      nombrePuesto: this.form.get('puesto')?.value,
      nombreEmpresa: this.form.get('empresa')?.value,
      descripcion:this.form.get('descripcion')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value.toISOString().slice(0,10),
      fechaFin:this.form.get('fechaFin')?.value.toISOString().slice(0,10),
      esTrabajoActual:this.checkbox,
      persona:this.identificadorP      
    }
    console.log(experiencia);
    this.loading = true;

    if(this.idExperiencia == undefined){      
      //Es agregar
      this._portafolioService.NuevoItem(experiencia, this.appi).subscribe(()=>{  
        this._metodoService.mensaje('Nueva Experiencia agregada con Exito !');       
      })
    }else {
      // es Editar
      this._portafolioService.editarItem(experiencia, this.appi).subscribe(data => {        
        this._metodoService.mensaje('Experiencia editada con Exito !');
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
    
  }

}
