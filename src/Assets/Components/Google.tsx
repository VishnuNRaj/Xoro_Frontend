import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
interface props {
    socialMedia: Function;
}
const Google: React.FC<props> = ({ socialMedia }) => {
    const responseMessage = (response: CredentialResponse) => {
        console.log('Login successful:', response);
        if (response.credential) {
            const userData:{
                email:string;
                name:string;
                sub:string | number;
                picture:string;
            } = jwtDecode(response.credential);
            console.log(userData)
            if(userData) {
                socialMedia({
                    type:'Google',
                    user: {
                        Email: userData.email,
                        Name: userData.name,
                        Password:userData.sub,
                        Profile:userData.picture
                    }
                })
            }
        }
    };

    return (
        <GoogleOAuthProvider clientId={'720396660551-d9a75lb492chtafthduq03ojbugu2qn2.apps.googleusercontent.com'}>
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
