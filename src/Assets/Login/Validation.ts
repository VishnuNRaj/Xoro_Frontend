import { ErrorForm, LoginFormInterface, LoginValidation } from "./LoginInterface";

export const LoginValidate: Function = (data: LoginFormInterface): LoginValidation => {
    try {
        const { Email, Password } = data
        let check: boolean = true
        const ErrorForm = <ErrorForm>{
            Email: '',
            Password: '',
            Main: ''
        }
        if (!Email || !Password) {
            ErrorForm.Main = 'Enter Valid Details'
            return { status: false, ErrorForm };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            check = false
            ErrorForm.Email = 'Invalid email format'
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(Password)) {
            check = false
            ErrorForm.Password = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
        }
        return {
            status: check, ErrorForm: ErrorForm
        }

    } catch (e) {
        return {
            status: false, ErrorForm: {
                Email: '',
                Password: '',
                Main: 'Validation Error'
            }
        }
    }
}
