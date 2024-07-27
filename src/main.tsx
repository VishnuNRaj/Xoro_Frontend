import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import store from './Store/Store.ts'
import axios from "axios"
import { SocketProvider } from './Socket.tsx'
import { ProgressProvider } from './Functions/ProgressContext.tsx';
axios.interceptors.request.use(config => {
  config.withCredentials = true;
  return config
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <ThemeProvider>
      <ProgressProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ProgressProvider>
    </ThemeProvider>
  </SocketProvider>
);
