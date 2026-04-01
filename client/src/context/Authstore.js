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
import toast from 'react-hot-toast';
import ModalStore from './ModalStore';

const { 
    loginUsers,
    logoutUsers,
    getUser,
    addUser,
    fetchUsers,
    deleteMultipleUsers,
    GET_SINGLE_USER,
    UPDATE_USER
} = ApiConfig;

const {
    SUCCESS_MESS
} = Strings;

const AuthStore = create((set, get) => ({
    AuthUser: null,
    AuthLoading: true,
    errorUser: null,
    selectedBranch: 'any',
    socket: null,
    input: {
        username: '',
        email: '',
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
    onlineUsers: [],
    fetchLoading: false,

    setInput: (name, value) => {
        const inputs = get().input;
        inputs[name] = value;
        set({input: inputs});
    },

    resetInput: () => set({
        input: {
            username: '',
            email: '',
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
        }
    }),

    checkAuth: async () => {
        try {
            const user = await axiosInstance.get(getUser);
            set({AuthUser: user.data.data});
        } catch (error) {
            //toast.error(error.message);
            set({errorUser: axiosError(error)});
            set({AuthUser: null});
        } finally {
            set({AuthLoading: false});
            get().connectSocket();
        }
    },

    loginUser: async (email, password) => {
        try {
            set({ AuthLoading: true, errorUser: null });
            
            const authUser = await axiosInstance.post(loginUsers, {
                email,
                password
            });
            
            set({ AuthUser: authUser.data });
            await get().checkAuth();
            
        } catch (error) {
            toast.error(error.message);
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
            toast.error(error.message);
            set({errorUser: axiosError(error)});
            return false;
        } finally {
            set({AuthLoading: false});
            get().disconnectSocket();
        }
    },

    addUser: async () => {
        const { setShowAddModal } = ModalStore.getState();
        try {
            const data = get().input;
            const payload = {
                username: data.username,
                email: data.email,
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
            const {_id, firstName, middleName, lastName, shift, salary, role, phoneNumber, branchLocation} = newUser.data.data;
            const newData = {
                Id: _id,
                Employee: `${firstName.toUpperCase()} ${middleName.toUpperCase()} ${lastName.toUpperCase()}`,
                Email: data.email,
                branchlocation: branchLocation,
                shift: shift,
                salary: salary,
                role: role,
                phoneNumber: phoneNumber,
                //address: address
            };

            set((state) => ({users: [newData, ...state.users]}));
            toast.success('New user added');
            // if (newUser.data.status === "Success") {
            //     window.location.reload();
            // }
        } catch (error) {
            toast.error(error.message);
            set({errorUser: axiosError(error)});
        } finally {
            setShowAddModal(false);
        }
    },

    fetchUsers: async () => {
        set({fetchLoading: true});
        try {
            const users = await axiosInstance.get(fetchUsers);
            const data = users.data.data;
            const userId = get().AuthUser._id;
            
            const cleanedData = data
            .filter((user) => user._id !== userId)
            // eslint-disable-next-line no-unused-vars
            .map(({email, timedIn, time, createdAt, createdById, updatedAt, __v, firstName, _id, middleName, gender, lastName, address, ...rest }) => rest);
            //console.log(cleanedData);
            set({users: cleanedData});
        } catch (error) {
            //toast.error(error.message);
            set({errorUser: axiosError(error)});
        } finally {
            set({fetchLoading: false});
        }
    },

    updateUser: async () => {
        try {
            const { selectedItem, setUpdatedItem, setEditUserModal, setChangesModal } = ModalStore.getState();
            const {
                username, 
                email,  
                firstName, 
                middleName, 
                lastName, 
                gender, 
                address,
                role,
                shift,
                salary,
                branch,
                phoneNumber
            } = get().input;

            const payload = {
                username: username || selectedItem.username,
                email: email || selectedItem.email,
                phoneNumber: phoneNumber || selectedItem.phoneNumber,
                firstName: firstName || selectedItem.firstName,
                middleName: middleName || selectedItem.middleName,
                lastName: lastName || selectedItem.lastName,
                gender: gender || selectedItem.gender,
                address: address || selectedItem.address,
                role: role || selectedItem.role,
                shift: shift || selectedItem.shift,
                salary: salary || selectedItem.salary,
                branchLocation: branch || selectedItem.branchLocation
            }
            
            const newUser = await axiosInstance.post(UPDATE_USER.replace(':id', selectedItem._id), payload);
            console.log(newUser.data);
            setUpdatedItem(newUser.data);
            setEditUserModal(false);
            setChangesModal(true);
            toast.success('User updated');
            get().fetchUsers();
            get().resetInput();
        } catch (error) {
            toast.error(error.message);
            set({errorUser: axiosError(error)});
        }
    },

    getSingleUser: async (id) => {
        try {
            const user = await axiosInstance.get(GET_SINGLE_USER.replace(':id', id));
            return user.data;
        } catch (error) {
            toast.error(error.message);
            set({errorUser: axiosError(error)});
        }
    },

    deleteMultipleUsers: async (data) => {
        // eslint-disable-next-line no-unused-vars
        const ids = data.map((i, _) => i.Id);
        try {
            const res = await axiosInstance.post(deleteMultipleUsers, ids);
            if (res.data.status === "Success") {
                const { setDeleteModal, setConfirmModal } = ModalStore.getState();
                const users = get().users;
                const newData = users.filter((d) => !ids.includes(d.Id));
                set({users: newData});
                setDeleteModal(false);
                setConfirmModal(true);
            }
        } catch (error) {
            toast.error(error.message);
            set({errorUser: axiosError(error)});
        }
    },

    deleteUser : async (id) => {
        const {setYesNoModal} = ModalStore.getState();
        try {
            const result = await axiosInstance.post(ApiConfig.deleteSingleUser, { id });
            if (result.data.status === "Success") {
                const users = get().users;
                const newData = users.filter((d) => d.Id !== id);
                set({users: newData});
                toast.success('User deleted');
            }
        } catch (error) {
            toast.error(error.message);
            set({errorUser: axiosError(error)});
        } finally {
            setYesNoModal(false);
        }
    },

    connectSocket: () => {
        const { AuthUser, socket } = get();
        
        if (!AuthUser?._id || socket?.connected) return;

        const newSocket = io(import.meta.env.VITE_API_URL, {
            auth: {
                userId: AuthUser._id,
                username: AuthUser.username,
                role: AuthUser.role
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