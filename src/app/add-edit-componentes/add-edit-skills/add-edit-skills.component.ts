import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Skill } from 'src/app/model/skill';

@Component({
  selector: 'app-add-edit-skills',
  templateUrl: './add-edit-skills.component.html',
  styleUrls: ['./add-edit-skills.component.css']
})
export class AddEditSkillsComponent implements OnInit {
  form: FormGroup;
  value=0;

  constructor(public dialogRef: MatDialogRef<AddEditSkillsComponent>,
    private fb : FormBuilder) { 
      this.form= this.fb.group({
        nombre:['',[Validators.required,Validators.minLength(3),Validators.maxLength(75)]],        
        porcentaje:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1),Validators.max(100)]],
              
      })
    }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

  addEditSkill() {
    const skill: Skill = {
      id:1,
      nombreSkill: this.form.get('nombre')?.value,
      porcentaje: this.form.get('porcentaje')?.value,      
      persona:1
      
    };
    console.log(skill);
  }

}
