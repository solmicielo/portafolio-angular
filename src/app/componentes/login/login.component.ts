import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { MetodosService } from 'src/app/servicios/metodos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;  
  loading:boolean = false; 

  constructor(
    private fb : FormBuilder, 
    private auth: AutenticacionService, 
    private ruta:Router,
    private _metodoService: MetodosService ) { 
    this.form= this.fb.group(
      {
        nombreUsuario: ['',[Validators.required,Validators.minLength(6)]],        
        password:['',[Validators.required,Validators.minLength(6)]],        
      }
    );
  }

  ngOnInit(): void {
  }
  get Usuario(){
    return this.form.get('user');
  }   
  
  get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
    this.loading = true;
    event.preventDefault;
    this.auth.IniciarSesion(this.form.value).subscribe({
      next:(token) => { 
        this.loading = false;
        this.ruta.navigate(['/portfolio']);
        localStorage.setItem('token', token.token);        
      },
      error:(e: HttpErrorResponse) => {        
        if (e.status == 401){
          this._metodoService.mensaje("Usuario y/o contraseña incorrectos!! Inténtalo Nuevamente o Regresa haciendo click en Cancelar.", 4)
        }
        
      }
    })
      
  }
  

}
