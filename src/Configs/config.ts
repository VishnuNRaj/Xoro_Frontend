interface configuration {
    USER: string;
    ADMIN: string;
    POST: string;
    PORT: number;
    SECRET: string;
    PROFILE:string;
}


const config: configuration = {
    USER: import.meta.env.VITE_APP_USER_API_URL,
    ADMIN: import.meta.env.VITE_APP_ADMIN_API_URL,
    POST: import.meta.env.VITE_APP_POST_API_URL,
    PORT: parseInt(import.meta.env.VITE_APP_PORT),
    SECRET: import.meta.env.VITE_APP_SECRET,
    PROFILE:import.meta.env.VITE_APP_PROFILE_API_URL,
}

export default config;