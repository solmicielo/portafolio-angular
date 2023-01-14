import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from 'src/app/model/persona';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css']
})
export class AddEditPersonaComponent implements OnInit {
  form: FormGroup;  
  loading:boolean = false;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPersonaComponent>,
    private dateAdapter: DateAdapter<Date>,
    private fb : FormBuilder,
    private _portafolioService:PortafolioService,
    private _metodoService: MetodosService){
      this.form= this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
        profesion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
        correo:['',[Validators.required,Validators.email ,Validators.minLength(4),Validators.maxLength(100)]],
        telefono:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        linkedin:['',[Validators.required,Validators.minLength(5),]],
        github:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]],
        img:[null,Validators.required, ],
        curriculum:[null,Validators.required, ],       
                
      })
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  EditPersona() {
    const persona: Persona = {
      id:1,
      nombre_completo:this.form.get('titulo')?.value,
      profesion:this.form.get('titulo')?.value,
      sobre_mi:this.form.get('titulo')?.value,
      url_foto:this.form.get('titulo')?.value,
      url_linkedin:this.form.get('titulo')?.value,
      url_github:this.form.get('titulo')?.value,
      url_curriculum:this.form.get('titulo')?.value,
      correo:this.form.get('titulo')?.value,
      telefono:this.form.get('titulo')?.value
      
    };
    console.log(persona);
    this.loading = true;
  }

}


