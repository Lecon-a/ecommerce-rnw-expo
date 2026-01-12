import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';

// const API_URL = 'http://localhost:3000/api'; // Local backend URL
const VITE_API_URL = 'https://ecommerce-rn-7w3ob.sevalla.app/api'
// replace with the production URL 

const api = axios.create({ 
    baseURL: VITE_API_URL, 
    headers: {
        "Content-Type": "application/json",
    },
});

export const useApi = () => {
    
    const { getToken } = useAuth();
    

    useEffect(() => {
        const interceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config
        })

        // Cleanup the interceptor on unmount
        return () => {
            api.interceptors.request.eject(interceptor);
        }
         
    }, [getToken])

    return api;
}

// on very request, we would like to attach the token to the headers 
// for the backend to know that the user is authenticated
