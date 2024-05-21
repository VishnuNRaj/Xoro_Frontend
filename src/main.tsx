import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './Store/Store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleConfig } from './Configs/googleConfig'
import { SocketProvider } from './Socket.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleConfig.CliendID}>
    <ThemeProvider>
      <SocketProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SocketProvider>
    </ThemeProvider>
  </GoogleOAuthProvider>

);
