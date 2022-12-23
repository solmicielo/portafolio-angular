import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);  

  constructor(private fb : FormBuilder) { 
    this.form= this.fb.group(
      {
        user: ['',[Validators.required,Validators.minLength(6)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        deviceInfo: this.fb.group({
          deviceId: [17867868768],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken: ["67657575eececc34"]
        })

      }
    );
  }

  ngOnInit(): void {
  }
  get Usuario(){
    return this.form.get('user');
  }   
  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  

}
