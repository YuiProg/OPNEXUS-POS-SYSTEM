import { isAxiosError } from 'axios';
import {create} from 'zustand';
import axiosInstance from '../helpers/axiosInstance';
import ApiConfig from '../../../backend/Api/ApiConfig';
import toast from 'react-hot-toast';
import Strings from '../../../backend/strings/strings';
import axiosError from '../helpers/axiosError';

const { 
    loginUsers,
    logoutUsers,
    getUser 
} = ApiConfig;

const {
    SUCCESS_MESS
} = Strings;

const AuthStore = create((set, get) => ({
    AuthUser: null,
    AuthLoading: false,
    error: null,

    checkAuth: async () => {
        try {
            set({AuthLoading: true});
            const user = await axiosInstance.get(getUser);
            set({AuthUser: user.data});
        } catch (error) {
            set({error: axiosError(error)});
            set({AuthUser: null});
        } finally {
            set({AuthLoading: false});
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
            set({error: axiosError(error)});
        } finally {
            set({AuthLoading: false});
        }
    },
    
    logoutUser: async () => {
        try {
            set({AuthLoading: true});
            
            const logout = await axiosInstance.post(logoutUsers);
            
            if (logout.data.status === SUCCESS_MESS) {
                set({AuthUser: null});
            }
        } catch (error) {
            set({error: axiosError(error)});
        } finally {
            set({AuthLoading: false});
        }
    }
}));

export default AuthStore;