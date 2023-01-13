export class Skill {
    id?:number;
    nombreSkill:String;
    porcentaje:number;
    persona?:number;

    constructor(id:number, nombreSkill:String, porcentaje:number, persona:number) {
        this.id = id;
        this.nombreSkill = nombreSkill;
        this.porcentaje = porcentaje;
        this.persona = persona;
    }
}
