export class Persona {
    id:number;
    nombre_completo:String;
    profesion:String;
    sobre_mi:String;
    url_foto:String;
    url_linkedin:String;
    url_github:String;
    url_curriculum:String;
    correo:String;
    telefono:String;

    

    constructor(id:number, nombre_completo:String, profesion:String,sobre_mi:String, url_foto:String,url_linkedin:String, url_github:String, url_curriculum:String, correo:String, telefono:String ){
        this.id = id;
        this.nombre_completo = nombre_completo;
        this.profesion = profesion;
        this.sobre_mi = sobre_mi;
        this.url_foto = url_foto;
        this.url_linkedin = url_linkedin;
        this.url_github = url_github;
        this.url_curriculum = url_curriculum;
        this.correo = correo;
        this.telefono = telefono;
    }

}
