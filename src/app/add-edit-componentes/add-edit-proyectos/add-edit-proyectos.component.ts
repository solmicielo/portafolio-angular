import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Proyecto } from 'src/app/model/proyecto';

@Component({
  selector: 'app-add-edit-proyectos',
  templateUrl: './add-edit-proyectos.component.html',
  styleUrls: ['./add-edit-proyectos.component.css']
})
export class AddEditProyectosComponent implements OnInit {
  form: FormGroup;  

  constructor(
    public dialogRef: MatDialogRef<AddEditProyectosComponent>,
    private fb : FormBuilder) {
      
      this.form= this.fb.group({
        titulo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
        repo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]],
        img:[null,Validators.required,],        
        demo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]]        
      })
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  addEditProyecto() {
    const proyecto: Proyecto = {
      id:1,
      titulo: this.form.get('titulo')?.value,
      urlImg: this.form.get('institucion')?.value,
      urlLive:this.form.get('descripcion')?.value,
      urlRepositorio: this.form.get('fechaInicio')?.value,           
      persona:1
      
    };
    console.log(proyecto);
  }

}
