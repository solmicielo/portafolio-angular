export class Experiencia {
    id:number;
    nombrePuesto:String;
    nombreEmpresa:String;
    descripcion:String;
    fechaInicio:Date;
    fechaFin:Date;
    esTrabajoActual:boolean;
    persona:number;
    

    constructor(id:number, nombrePuesto:String, nombreEmpresa:String,descripcion:String, fechaInicio:Date,fechaFin:Date, esTrabajoActual:boolean, persona:number ){
        this.id = id;
        this.nombrePuesto = nombrePuesto;
        this.nombreEmpresa = nombreEmpresa;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.esTrabajoActual = esTrabajoActual;
        this.persona = persona;        
    }
    
}
