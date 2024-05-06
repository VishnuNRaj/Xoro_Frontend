import { ErrorForm, RegisterForm, RegisterValidate } from "./RegisterInterface";


export const validateForm = (form: RegisterForm): RegisterValidate => {
    const { Name, Email, Password, Phone, ConfirmPassword,type } = form;
    console.log(form)
    let ErrorForm = <ErrorForm>{
        Name: "",
        Email: "",
        Password: "",
        Phone: "",
        ConfirmPassword: "",
        Main: ''
    }

    let check = true

    if (!Name || !Email || type === 'Email' && !ConfirmPassword) {
        ErrorForm.Main = 'Enter Valid Details'
        return { status: false, ErrorForm };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
        check = false
        ErrorForm.Email = 'Invalid email format'
    }

    // const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    // if (Username && !usernameRegex.test(Username)) {
    //     check = false
    //     ErrorForm.Username = 'Username must be between 3 and 30 characters long and can only contain letters, numbers, and underscores';
    // }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(Name)) {
        check = false
        ErrorForm.Name = 'Name can only contain letters and spaces';
    }

    if (Password !== ConfirmPassword) {
        check = false
        ErrorForm.Password = 'Passwords do not match';
        ErrorForm.ConfirmPassword = 'Passwords do not match';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (type === 'Email' && !passwordRegex.test(Password) && Password === ConfirmPassword) {
        check = false
        ErrorForm.Password = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
    }



    if (Phone) {
        if (Phone.toString().length != 10) {
            check = false
            ErrorForm.Phone = 'Enter phone number properly'
        }
        else if (isNaN(Phone)) {
            check = false
            ErrorForm.Phone = 'Enter phone number properly'
        }
    }

    return { status: check, ErrorForm };
};


