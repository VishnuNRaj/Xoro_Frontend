export interface RegisterForm {
    Name:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
    Phone:number | null;
}

export interface RegisterValidate {
    status:boolean;
    ErrorForm:ErrorForm;
}

export interface ErrorForm {
    Name:string;
    Email:string;
    Password:string;
    ConfirmPassword:string;
    Phone:string;
    Main:string;
}