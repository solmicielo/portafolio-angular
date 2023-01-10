import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PortafolioService } from './portafolio.service';



@Injectable({
  providedIn: 'root'
})
export class MetodosService {
  
  

  constructor(    
    private _snackBar: MatSnackBar,
    private _portafolioService: PortafolioService
    
    ) { }

    mensaje(mensaje: string){
      this._snackBar.open(mensaje, '',{
        duration: 2000
      });
    }

    
}
