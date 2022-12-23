import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-formacion',
  templateUrl: './add-edit-formacion.component.html',
  styleUrls: ['./add-edit-formacion.component.css']
})
export class AddEditFormacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditFormacionComponent>,) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
