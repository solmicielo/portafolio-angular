export class Habilidad {
    id?:number;
    nombreHabilidad:String;
    porcentaje:number;
    persona:number;

    constructor(id:number, nombreHabilidad:String, porcentaje:number, persona:number) {
        this.id = id;
        this.nombreHabilidad = nombreHabilidad;
        this.porcentaje = porcentaje;
        this.persona = persona;
    }

}
