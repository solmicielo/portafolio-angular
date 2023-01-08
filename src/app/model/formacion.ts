export class Formacion {
    id?:number;
    nombreEstudio:String;
    nombreAcademia:String;
    descripcion:String;
    fechaInicio:Date;
    fechaFin:Date;
    estasCursando:boolean;
    persona?:number;
    

    constructor(id:number, nombreEstudio:String, nombreAcademia:String,descripcion:String, fechaInicio:Date,fechaFin:Date, estasCursando:boolean, persona:number ){
        this.id = id;
        this.nombreEstudio = nombreEstudio;
        this.nombreAcademia = nombreAcademia;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estasCursando = estasCursando;
        this.persona = persona;        
    }
}
