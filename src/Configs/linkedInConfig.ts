import dotenv from 'dotenv'
import { linkedInConfigInterface } from '../Interfaces/UserInterface'
dotenv.config()

export const linkedInConfig = ():linkedInConfigInterface => {
    return <linkedInConfigInterface>{
        CliendID: process.env.REACT_APP_LINKEDIN_CLIENT_ID || '',
        Secret: process.env.REACT_APP_LINKEDIN_CLIENT_SECRET || '',
        RedirectURL: process.env.REACT_APP_REDIRECT_URL || '',
    }
}