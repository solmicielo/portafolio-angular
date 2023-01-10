import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;   

  constructor(private fb : FormBuilder, private auth: AutenticacionService, private ruta:Router ) { 
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
    event.preventDefault;
    this.auth.IniciarSesion(this.form.value).subscribe({
      next:(token) => { 
        this.ruta.navigate(['/portfolio']);
        localStorage.setItem('token', token.token);
        
      } })
      
  }
  

}
