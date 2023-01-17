import { Injectable } from '@angular/core';
import { getDownloadURL, list, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { PortafolioService } from './portafolio.service';



@Injectable({
  providedIn: 'root'
})
export class MetodosService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  urlImg: string | undefined ;
  urlCv: string | undefined ;
  

  constructor(    
    private _snackBar: MatSnackBar,
    private _portafolioService: PortafolioService,
    private storage:Storage  
    ) { }

    mensaje(mensaje: string, segundos: number): void {
      this._snackBar.open(mensaje, '',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: segundos * 1000
      });
    }

    subirImg($event: any, name: string) {      
      const file = $event.target.files[0];
      const imgRef = ref(this.storage, `images/`+ name);
      uploadBytes(imgRef, file).then (response => {
        this.getImg();
        
      }).catch(e => console.log(e))
      
      
    }   

    getImg(){
      const imagesRef = ref(this.storage, 'images');
      list(imagesRef).then(async response =>{
        for(let item of response.items){
          this.urlImg = await getDownloadURL(item);
          console.log('La url de imagen es:  '+ this.urlImg);
          
        }
      })
      .catch(e => console.log(e))

    }

    subirPdf($event: any, name: string) {      
      const file = $event.target.files[0];
      const cvRef = ref(this.storage, `archivos/`+ name);
      uploadBytes(cvRef, file).then (response => {
        this.getCv();
        console.log('esto es en subir Pdf', this.urlCv);
        
      }).catch(e => console.log(e))
      
      
    }

    getCv(){
      const curriculumRef = ref(this.storage, 'archivos');
      list(curriculumRef).then(async response =>{
        for(let item of response.items){
          this.urlCv = await getDownloadURL(item);
          console.log('La url de cv es es:  '+ this.urlCv);
          
        }
      })
      .catch(e => console.log(e))

    }

    
}
