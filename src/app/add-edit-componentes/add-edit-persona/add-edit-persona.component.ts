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
  idPersona:number;
  appi:string = this._portafolioService.apiUrlPersona;
  img!:any;
  cv!:any;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditPersonaComponent>,    
    private fb : FormBuilder,
    private _portafolioService:PortafolioService,
    private _metodoService: MetodosService){
      this.form= this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
        profesion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
        sobre_mi:['',[Validators.required,Validators.minLength(10),Validators.maxLength(2500)]],
        correo:['',[Validators.required,Validators.email ,Validators.minLength(4),Validators.maxLength(100)]],
        telefono:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        linkedin:['',[Validators.required,Validators.minLength(5),]],
        github:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]]
       
      })
      this.idPersona = data.id;
    }

  ngOnInit(): void {
    this.buscarPersona(this.idPersona);    
  }
  
  buscarPersona(id:number){
    this._portafolioService.buscarItem(id, this.appi).subscribe(data =>{
      this.form.patchValue({
        id:data.id,
        nombre:data.nombre_completo,
        profesion:data.profesion,
        sobre_mi:data.sobre_mi,
        correo:data.correo,
        telefono:data.telefono,
        linkedin:data.url_linkedin,
        github:data.url_github,
        img: data.url_foto,
        curriculum:data.url_curriculum
      });
      if(this._metodoService.urlImg == undefined){
        this.img =data.url_foto;
      }else {
        this.img =this._metodoService.urlImg;
      };

      if(this._metodoService.urlCv == undefined){
        this.cv =data.url_curriculum;
      }else {
        this.img =this._metodoService.urlCv;
      }
      
      console.log( data.url_foto);
      console.log('Esto es la url',   this._metodoService.urlImg);
      
    });
  }
  

  subirImagen($event: any){
    const idImg = this.idPersona;
    const name = "perfil_" + idImg;
    this._metodoService.subirImg($event, name);
  }

  subirCv($event: any){
    const idImg = this.idPersona;
    const name = "curriculum_" + idImg;
    this._metodoService.subirPdf($event, name);
  }

  cancelar() {
    this.dialogRef.close();
  }

  EditPersona() {
    const persona: Persona = {
      id:this.idPersona,
      nombre_completo:this.form.get('nombre')?.value,
      profesion:this.form.get('profesion')?.value,
      sobre_mi:this.form.get('sobre_mi')?.value,
      url_foto:this.img,
      url_linkedin:this.form.get('linkedin')?.value,
      url_github:this.form.get('github')?.value,
      url_curriculum:this.cv,
      correo:this.form.get('correo')?.value,
      telefono:this.form.get('telefono')?.value
      
    };
    console.log(persona);    
    
    this.loading = true;

    this._portafolioService.editarItem(persona, this.appi).subscribe(data => {        
      this._metodoService.mensaje('Información de Perfil editada con Exito !', 2);
    })
    this.loading = false;
    this.dialogRef.close(true);
  }



}


