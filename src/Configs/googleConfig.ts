import { googleConfigInterface } from '../Interfaces/UserInterface'
console.log(import.meta.env)

export const googleConfig = <googleConfigInterface>{
    CliendID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    Secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
    RedirectURL: import.meta.env.VITE_APP_REDIRECT_URL || '',
}