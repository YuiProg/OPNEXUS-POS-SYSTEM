//import { isAxiosError } from 'axios';
import {create} from 'zustand';
import axiosInstance from '../helpers/axiosInstance';
import ApiConfig from '../Api/ApiConfig';
//import toast from 'react-hot-toast';
import Strings from '../strings/strings-codes';
import axiosError from '../helpers/axiosError';
import Toast from '../toast/Toast';
import { Navigate } from 'react-router-dom';
import {io} from 'socket.io-client';

const { 
    loginUsers,
    logoutUsers,
    getUser,
    addUser,
    fetchUsers,
    deleteMultipleUsers
} = ApiConfig;

const {
    SUCCESS_MESS
} = Strings;

const AuthStore = create((set, get) => ({
    AuthUser: null,
    AuthLoading: true,
    errorUser: null,
    selectedBranch: null,
    socket: null,
    input: {
        username: '',
        password: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        phoneNumber: null,
        shift: '',
        role: '',
        address: '',
        branch: '',
        salary: null
    },
    users: [],

    setInput: (name, value) => {
        const inputs = get().input;
        inputs[name] = value;
        set({input: inputs});
    },

    checkAuth: async () => {
        try {
            const user = await axiosInstance.get(getUser);
            set({AuthUser: user.data.data});
        } catch (error) {
            set({errorUser: axiosError(error)});
            set({AuthUser: null});
        } finally {
            set({AuthLoading: false});
            get().connectSocket();
        }
    },

    loginUser: async (username, password) => {
        try {
            set({ AuthLoading: true, errorUser: null });
            
            const authUser = await axiosInstance.post(loginUsers, {
                username,
                password
            });
            
            set({ AuthUser: authUser.data });
            await get().checkAuth();
            
        } catch (error) {
            set({ errorUser: axiosError(error) });
        } finally {
            set({ AuthLoading: false });
        }
    },
    
    logoutUser: async () => {
        try {
            set({AuthLoading: true});
            
            const logout = await axiosInstance.post(logoutUsers);
            
            if (logout.data.status === SUCCESS_MESS) {
                set({AuthUser: null});
            }

            return true;
            
        } catch (error) {
            set({errorUser: axiosError(error)});
            return false;
        } finally {
            set({AuthLoading: false});
            get().disconnectSocket();
        }
    },

    addUser: async () => {
        try {
            const data = get().input;
            const payload = {
                username: data.username,
                password: data.password,
                branchLocation: data.branch,
                shift: data.shift,
                salary: Number(data.salary),
                phoneNumber: Number(data.phoneNumber),
                role: data.role,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                gender: data.gender,
                address: data.address
            };

            //console.log(payload);
            const newUser = await axiosInstance.post(addUser, payload);
            if (newUser.data.status === "Success") {
                window.location.reload();
            }
        } catch (error) {
            set({errorUser: axiosError(error)});
        }
    },

    fetchUsers: async () => {
        try {
            const users = await axiosInstance.get(fetchUsers);
            const data = users.data.data;
            const userId = get().AuthUser._id;

            const cleanedData = data
            .filter((user) => user._id !== userId)
            // eslint-disable-next-line no-unused-vars
            .map(({ username, createdAt, createdById, updatedAt, __v, firstName, _id, middleName, gender, lastName, ...rest }) => rest);

            set({users: cleanedData});
        } catch (error) {
            set({errorUser: axiosError(error)});
        }
    },

    deleteMultipleUsers: async (data) => {
        // eslint-disable-next-line no-unused-vars
        const ids = data.map((i, _) => i.Id);
        try {
            const res = await axiosInstance.post(deleteMultipleUsers, ids);
            if (res.data.status === "Success") {
                window.location.reload();
            }
        } catch (error) {
            set({errorUser: axiosError(error)});
        }
    },

    connectSocket: () => {
        const { AuthUser, socket } = get();
        
        
        if (!AuthUser?._id || socket?.connected) return;

        const newSocket = io(import.meta.env.VITE_API_URL, {
            query: {
                userId: AuthUser._id
            },
            autoConnect: false 
        });

        newSocket.connect();
        set({ socket: newSocket });

        newSocket.on('onlineUsers', (data) => {
            console.log(data);
            set({ onlineUsers: data });
        });
    },
    
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect(); 
    }

}));

export default AuthStore;