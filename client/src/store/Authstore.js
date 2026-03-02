import { isAxiosError } from 'axios';
import {create} from 'zustand';
import axiosInstance from '../helpers/axiosInstance';
import ApiConfig from '../Api/ApiEndpoints';
import toast from 'react-hot-toast';

const { 
    loginUsers 
} = ApiConfig;

const AuthStore = create((set) => ({
    AuthUser: null,

    checkAuth: () => {},

    loginUser: async (username, password) => {
        try {
            const authUser = await axiosInstance.post(loginUsers, {
                username,
                password
            }); 
            toast.success('User logged in!');
            console.log(authUser);
        } catch (error) {
            console.log(error);
        }
    }
}));

export default AuthStore;