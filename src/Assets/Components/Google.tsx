import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleConfig } from '../../Configs/googleConfig'
interface props {
    socialMedia: Function;
}
const Google: React.FC<props> = ({ socialMedia }) => {
    const { CliendID } = googleConfig
    const responseMessage = (response: CredentialResponse) => {
        console.log('Login successful:', response);
        if (response.credential) {
            const userData: {
                email: string;
                name: string;
                sub: string | number;
                picture: string;
            } = jwtDecode(response.credential);
            console.log(userData)
            if (userData) {
                socialMedia({
                    type: 'Google',
                    user: {
                        Email: userData.email,
                        Name: userData.name,
                        Password: userData.sub,
                        Profile: userData.picture
                    }
                })
            }
        }
    };
    console.log(googleConfig)
    return (
        <GoogleOAuthProvider clientId={CliendID}>
            <div>
                <GoogleLogin
                    onSuccess={responseMessage}
                    size="medium"
                    theme='filled_black'
                    logo_alignment='center'
                    text='continue_with'
                    shape='pill'
                    type='icon'
                    ux_mode='popup'
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Google;
