import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PortafolioService } from './portafolio.service';



@Injectable({
  providedIn: 'root'
})
export class MetodosService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  

  constructor(    
    private _snackBar: MatSnackBar,
    private _portafolioService: PortafolioService
    
    ) { }

    mensaje(mensaje: string, segundos: number): void {
      this._snackBar.open(mensaje, '',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: segundos * 1000
      });
    }

    
}
