export interface LoginFormInterface {
    Email:string;
    Password:string;
}

export interface ErrorForm {
    Email:string,
    Password:string;
    Main:string;
}

export interface LoginValidation {
    status:boolean;
    ErrorForm:ErrorForm
}