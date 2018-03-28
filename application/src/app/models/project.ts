export class Project {
    constructor(public key: string,
        public categoria: string,
        public contractaddress: string,
        public description: string,
        public fechafin: Date,
        public fechainicio: Date,
        public finalizado: boolean,
        public idCrowsale: string,
        public idUser: string,
        public imagen: string,
        public subtitulo: string,
        public titulo: string,
        public urlvideo: string) {
     }
}
