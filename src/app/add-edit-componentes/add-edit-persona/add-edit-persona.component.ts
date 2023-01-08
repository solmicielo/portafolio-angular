import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css']
})
export class AddEditPersonaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditPersonaComponent>,
    private dateAdapter: DateAdapter<Date>,
    private fb : FormBuilder) { }

  ngOnInit(): void {
  }

}
