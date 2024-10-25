export interface IUser {
    userId:string;
    photo?:string;
    name:string;
    apellidos:string;
    sexo:string;
    email:string;
    pass?:string;
    telefono:number;
    type: string;
    edit?:boolean;
}