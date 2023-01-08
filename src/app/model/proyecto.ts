export class Proyecto {
    id:number;
    titulo:String;
    urlImg:String;
    urlLive:String;
    urlRepositorio:String;    
    persona:number;

    constructor(id:number, titulo:String, urlImg:String,urlLive:String, urlRepositorio:String, persona:number ){
        this.id = id;
        this.titulo = titulo;
        this.urlImg = urlImg;
        this.urlLive = urlLive;
        this.urlRepositorio = urlRepositorio;
        this.persona = persona;
    }
}
