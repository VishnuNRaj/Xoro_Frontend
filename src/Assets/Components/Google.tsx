import React from 'react';
import { GoogleLogin, CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { googleConfig } from '../../Configs/googleConfig';

interface props {
    socialMedia: Function;
}


const GoogleAuth: React.FC<props> = ({ socialMedia }) => {
    const responseMessage = (response: CredentialResponse) => {
        if (response.credential) {
            const userData: {
                email: string;
                name: string;
                sub: string | number;
                picture: string;
            } = jwtDecode(response.credential);
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
    return (
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
    );
};

const Google: React.FC<props> = ({ socialMedia }) => {
    return (
        <GoogleOAuthProvider clientId={googleConfig.CliendID}>
            <GoogleAuth socialMedia={socialMedia} />
        </GoogleOAuthProvider>

    )
}

export default Google;
