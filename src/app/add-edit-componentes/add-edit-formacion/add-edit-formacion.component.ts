import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formacion } from 'src/app/model/formacion';
import { PortafolioService } from 'src/app/servicios/portafolio.service';


@Component({
  selector: 'app-add-edit-formacion',
  templateUrl: './add-edit-formacion.component.html',
  styleUrls: ['./add-edit-formacion.component.css']
})
export class AddEditFormacionComponent implements OnInit {
  form: FormGroup;
  id:number= 0;
  maxDate:Date;
  idFormacion:number | undefined;
  loading:boolean = false;
  checkbox:boolean = false;
  operacion:string = 'Agregar ';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddEditFormacionComponent>,
    private dateAdapter: DateAdapter<Date>, private fb : FormBuilder, private _portafolioService:PortafolioService) {
      this.maxDate = new Date();
      this.form= this.fb.group({
        titulo:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],
        institucion:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],
        fechaInicio:[null,Validators.required],
        fechaFin:[null,Validators.required],
        alPresente:[null,],
        descripcion:['',[Validators.required,Validators.minLength(10),Validators.maxLength(2500)]]        
      })
      this.idFormacion = data.id
      
      
    }


  ngOnInit(): void {
    this.idPersona();
    this.esEditar(this.idFormacion);
  }
  esEditar(id:number| undefined){
    if(id !== undefined){
      this.operacion = 'Editar ';
      this.buscarFormacion(id);
    }
  }
  buscarFormacion(id:number){
    this._portafolioService.buscarFormacion(id).subscribe(data =>{
      this.form.patchValue({
        id:data.id,
        titulo:data.nombreEstudio,
        institucion: data.nombreAcademia,
        fechaInicio:new Date (data.fechaInicio),
        fechaFin:new Date (data.fechaFin),
        alPresente:data.estasCursando,
        descripcion:data.descripcion
      });
    });
  }
  idPersona():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.id = data.id;
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
    this.dialogRef.close(false);
  }

  addEditFormacion() {
    this.idPersona();
    this.ObtenerCheckbox();
    
    const formacion: Formacion = {
      id:this.idFormacion,
      nombreEstudio: this.form.get('titulo')?.value,
      nombreAcademia: this.form.get('institucion')?.value,
      descripcion:this.form.get('descripcion')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value.toISOString().slice(0,10),
      fechaFin:this.form.get('fechaFin')?.value.toISOString().slice(0,10),
      estasCursando:this.checkbox,
      persona:this.id  
      
    };
    
    this.loading = true;

    if(this.id !== undefined){      
      //Es agregar
      this._portafolioService.NuevaFormacion(formacion).subscribe(()=>{         
      })
    }else {
      // es Editar
      this._portafolioService.editarFormacion(formacion).subscribe(data => {
      })
    }
    this.loading = false;
    this.dialogRef.close(true); 
    
  }


}
