import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from 'src/app/model/proyecto';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-add-edit-proyectos',
  templateUrl: './add-edit-proyectos.component.html',
  styleUrls: ['./add-edit-proyectos.component.css']
})
export class AddEditProyectosComponent implements OnInit {
  form: FormGroup;
  identificadorP!: number;   
  idProyecto:number | undefined;
  loading:boolean = false;  
  operacion:string = 'Agregar ';
  appi:string = this._portafolioService.apiUrlProyectos;  
  img!:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditProyectosComponent>,
    private fb : FormBuilder,
    private _portafolioService:PortafolioService,
    private _metodoService: MetodosService) {
      
      this.form= this.fb.group({
        titulo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
        repo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]],
        img:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]],        
        demo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(200)]]        
      })
      this.idProyecto = data.id;
    }

  ngOnInit(): void {
    this.idPersona();
    this.esEditar(this.idProyecto);
  }

  esEditar(id:number| undefined){
    if(id !== undefined){
      this.operacion = 'Editar ';
      this.buscarProyecto(id);
    }
  }

  buscarProyecto(id:number){
    this._portafolioService.buscarItem(id, this.appi).subscribe(data =>{
      this.form.patchValue({
        id:data.id,
        titulo:data.titulo,
        repo: data.urlRepositorio,
        demo:data.urlLive,
        img:data.urlImg,
        
        
      });
      if(this._metodoService.urlImg == undefined){
        this.img =data.urlImg;
      }else {
        this.img =this._metodoService.urlImg;
      };
    });
    
  }

  subirImagen($event: any){
    const idImg = this.idProyecto;
    const name = "proyecto_" + idImg;
    this._metodoService.subirImg($event, name);
  }

  idPersona():void{
    this._portafolioService.obtenerDatos().subscribe(data => {
      this.identificadorP = data.id;
      })
      ;
  }

  cancelar() {
    this.dialogRef.close();
  }

  addEditProyecto() {
    this.idPersona();
    const proyecto: Proyecto = {
      id:this.idProyecto,
      titulo: this.form.get('titulo')?.value,
      urlImg: this.form.get('img')?.value,
      urlLive:this.form.get('demo')?.value,
      urlRepositorio: this.form.get('repo')?.value,           
      persona:this.identificadorP
      
    };
    this.loading = true;
    
    if(this.idProyecto == undefined){      
      //Es agregar
      this._portafolioService.NuevoItem(proyecto, this.appi).subscribe(()=>{  
        this._metodoService.mensaje('Nueva Proyecto agregado con Exito !', 2);       
      })
    }else {
      // es Editar
      this._portafolioService.editarItem(proyecto, this.appi).subscribe(data => {        
        this._metodoService.mensaje('Proyecto editado con Exito !', 2);
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

}
