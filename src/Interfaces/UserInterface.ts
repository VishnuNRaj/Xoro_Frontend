export interface RegisterInterface {
    Name:string;
    Email:string;
    Password:string;
    Phone : number | null
}

export interface LoginInterface {
    Email:string;
    Password:string;
}

export interface RegisterResponse {
    status:number;
    errors:string[];
    message:string
}

export interface LoginResponse {
    status:number;
    errors:string[];
    message:string
}