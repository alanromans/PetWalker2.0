export interface IUser {
    userId:string;
    photo?:string;
    name:string;
    apellidos:string;
    sexo:string;
    email:string;
    pass?:string;
    telefono:string;
    type: string;
    edit?:boolean;
}