import axios from "axios";
import config from "./Configs/config";
import { getCookie } from "./Functions/CommonFunctions";

export const subscribe = async (serviceWorkerReg: ServiceWorkerRegistration) => {
    try {
        let subscription = await serviceWorkerReg.pushManager.getSubscription();
        if (!subscription) {
            subscription = await serviceWorkerReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BOCVKtCi34hgnwOWSK5jXlZEUijYKyAcRkBa5jwCPuo0jheodoV1974ij6SupCtiUEoHEofyaucnRo2EqXNBNwY',
            });
            const token = getCookie("token")
            if (token) {
                await axios.post(`${config.USER}/subscribe`, subscription, {
                    withCredentials: true,
                    headers: {
                        Authorization: token
                    }
                });
            }
        }
        console.log({ subscription });
        return subscription;
    } catch (e) {
        console.log(e)
    }
}


const fction = async () => {
    try {
        const token = getCookie("token")
        if (token) {
            const url = '/serviceWorker.js';
            const reg = await navigator.serviceWorker.register(url, {
                scope: "/"
            });
            console.log('Service worker registered:', reg);
            await navigator.serviceWorker.ready;
            console.log('Service worker is active');

            await subscribe(reg);
        } else return;

    } catch (error) {
        console.error('Service worker registration failed:', error);
    }
};

export default fction;