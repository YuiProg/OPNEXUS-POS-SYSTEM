import { isAxiosError } from 'axios';
import {create} from 'zustand';
import axiosInstance from '../helpers/axiosInstance';
import ApiConfig from '../Api/ApiEndpoints';
import toast from 'react-hot-toast';
import Strings from '../../../backend/strings/strings';

const { 
    loginUsers,
    getUser 
} = ApiConfig;

const {
    SERVER_ERROR
} = Strings;

const AuthStore = create((set) => ({
    AuthUser: null,
    AuthLoading: false,
    error: null,

    checkAuth: async () => {
        try {
            const user = await axiosInstance.get(getUser);
            set({AuthUser: user.data});
        } catch (error) {
            if (isAxiosError(error)) {
                set({error: error.response?.data});
            } else {
                set({error: SERVER_ERROR});
            }
        }
    },

    loginUser: async (username, password) => {
        try {
            set({AuthLoading: true, error: null});
            const authUser = await axiosInstance.post(loginUsers, {
                username,
                password
            }); 
            //toast.success('User logged in!');
            set({AuthUser: authUser.data});
        } catch (error) {
            if (isAxiosError(error)) {
                set({error: error.response?.data});
            } else {
                set({error: 'Network error'});
            }
        } finally {
            set({AuthLoading: false});
        }
    }
}));

export default AuthStore;