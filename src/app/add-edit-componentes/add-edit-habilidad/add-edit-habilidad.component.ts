import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Habilidad } from 'src/app/model/habilidad';
import { MetodosService } from 'src/app/servicios/metodos.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-add-edit-habilidad',
  templateUrl: './add-edit-habilidad.component.html',
  styleUrls: ['./add-edit-habilidad.component.css']
})
export class AddEditHabilidadComponent implements OnInit {
  form: FormGroup;
  identificadorP!: number;  
  maxDate:Date;
  idHabilidad:number | undefined;
  loading:boolean = false;
  checkbox:boolean = false;
  operacion:string = 'Agregar ';
  appi:string = this._portafolioService.apiUrlHabilidades;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditHabilidadComponent>,
    private dateAdapter: DateAdapter<Date>,
    private fb : FormBuilder,
    private _portafolioService:PortafolioService,
    private _metodoService: MetodosService) { 
      this.maxDate = new Date();
      this.form= this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],        
        porcentaje:['',[Validators.pattern("^[0-9]*$"),Validators.min(1),Validators.max(100)]],              
      })
      this.idHabilidad= data.id;
    }

  ngOnInit(): void {
    this.idPersona();
    this.esEditar(this.idHabilidad);
  }

  esEditar(id:number| undefined){
    if(id !== undefined){
      this.operacion = 'Editar ';
      this.buscarHabilidad(id);
    }
  }
  buscarHabilidad(id:number){
    this._portafolioService.buscarItem(id, this.appi).subscribe(data =>{
      this.form.patchValue({
        id:data.id,
        nombre:data.nombreHabilidad,
        porcentaje: data.porcentaje,
        
      });
    });
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

  addEditHabilidad() {
    this.idPersona();
    const habilidad: Habilidad = {
      id:this.idHabilidad,
      nombreHabilidad: this.form.get('nombre')?.value,
      porcentaje: this.form.get('porcentaje')?.value,      
      persona:this.identificadorP
      
    };
    console.log(habilidad);
    this.loading = true;

    if(this.idHabilidad == undefined){      
      //Es agregar
      this._portafolioService.NuevoItem(habilidad, this.appi).subscribe(()=>{  
        this._metodoService.mensaje('Nueva Habilidad agregada con Exito !');       
      })
    }else {
      // es Editar
      this._portafolioService.editarItem(habilidad, this.appi).subscribe(data => {        
        this._metodoService.mensaje('Habilidad editada con Exito !');
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

}


