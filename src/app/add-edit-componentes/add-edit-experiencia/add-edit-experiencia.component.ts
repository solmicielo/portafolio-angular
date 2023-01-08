import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Experiencia } from 'src/app/model/experiencia';

@Component({
  selector: 'app-add-edit-experiencia',
  templateUrl: './add-edit-experiencia.component.html',
  styleUrls: ['./add-edit-experiencia.component.css']
})
export class AddEditExperienciaComponent implements OnInit {
  form: FormGroup;
  maxDate:Date;

  constructor(public dialogRef: MatDialogRef<AddEditExperienciaComponent>,
    private dateAdapter: DateAdapter<Date>,
    private fb : FormBuilder) { 
      this.maxDate = new Date();
      this.form= this.fb.group({
        puesto:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],
        empresa:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],
        fechaInicio:[null,Validators.required,],
        fechaFin:[null,],
        alPresente:[null,],
        descripcion:['',[Validators.required,Validators.minLength(10),Validators.maxLength(2500)]]        
      })
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  addEditExperiencia() {
    const experiencia: Experiencia = {
      id:1,
      nombrePuesto: this.form.get('puesto')?.value,
      nombreEmpresa: this.form.get('empresa')?.value,
      descripcion:this.form.get('descripcion')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value,
      fechaFin:this.form.get('fechaFin')?.value,
      esTrabajoActual:this.form.get('alPresente')?.value,
      persona:1
      
    };
    console.log(experiencia);
  }

}
