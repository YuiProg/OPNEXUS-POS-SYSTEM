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
import BranchStore from './BranchStore';

const { 
    loginUsers,
    logoutUsers,
    getUser,
    addUser,
    fetchUsers,
    deleteMultipleUsers,
    GET_SINGLE_USER,
    UPDATE_USER,
    UPDATEBRANCH
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
    recentActivity: null,
    singleUser: null,

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
        const { setServerError } = ModalStore.getState();
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
            setServerError(true);
            return false;
        } finally {
            set({AuthLoading: false});
            get().disconnectSocket();
            get().checkAuth();
        }
    },

    addUser: async (isAdmin) => {
        const { setShowAddModal, setServerError } = ModalStore.getState();
        //const { getBranchByLocation } = BranchStore.getState();
        try {
            const data = get().input;
            const payloadAdmin = {
                username: data.username,
                email: data.email,
                password: data.password,
                //branchLocation: 'ADMIN',
                shift: 'ADMIN',
                salary: Number(data.salary),
                phoneNumber: Number(data.phoneNumber),
                role: data.role,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                gender: data.gender,
                address: data.address
            };

            const payloadClerk = {
                username: data.username,
                email: data.email,
                password: data.password,
                //branchLocation: data.branch,
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

            //get muna yung branch check kung may laman na
            // if (isAdmin !== "Admin") {
            //     const check = await getBranchByLocation(data.branch);
            //     if (check.clerkName) {
            //         return toast.error('Branch already has a user!');
            //     }
            // }
            let user;
            
            if (isAdmin === "Admin") {
                const newUserAdmin = await axiosInstance.post(addUser, payloadAdmin);
                user = newUserAdmin
            } else if (isAdmin === "Clerk") {
                const newUserAdmin = await axiosInstance.post(addUser, payloadClerk);
                user = newUserAdmin
            }

            
            const {_id, shift, salary, role, phoneNumber, branchLocation, username} = user.data.data;
            // if (isAdmin !== "Admin") {
            //     await axiosInstance.post(UPDATEBRANCH.replace(':location', data.branch), {
            //         clerkName: data.username,
            //         clerkId: _id,
            //         role: role,
            //         session: shift
            //     });
            // }

            const newData = {
                Id: _id,
                //Employee: `${firstName.toUpperCase()} ${middleName.toUpperCase()} ${lastName.toUpperCase()}`,
                username,
                Email: data.email,
                branchlocation: branchLocation || 'N/A',
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
            setShowAddModal(false);
        } catch (error) {
            toast.error(error.message);
            set({errorUser: axiosError(error)});
            setServerError(true);
        }
    },

    fetchUsers: async () => {
        set({fetchLoading: true});
        const { setServerError } = ModalStore.getState();
        try {
            const users = await axiosInstance.get(fetchUsers);
            const data = users.data.data;
            const userId = get().AuthUser._id;
            /* eslint-disable no-unused-vars */
            const cleanedData = data
            .filter((user) => user._id !== userId)
            .map(({ Employee, username, timedIn, time, createdAt, createdById, updatedAt, __v, firstName, _id, middleName, gender, lastName, address, ...rest }) => ({
                ...rest,
                branchLocation: rest.branchLocation ?? "N/A",
            }));
            set({users: cleanedData});
        } catch (error) {
            //toast.error(error.message);
            setServerError(true);
            set({errorUser: axiosError(error)});
        } finally {
            set({fetchLoading: false});
        }
    },

    updateUser: async () => {
        const { getBranchByLocation } = BranchStore.getState();
        const { setServerError } = ModalStore.getState();
        try {
            const { selectedItem, setUpdatedItem, setEditUserModal, setChangesModal, setOldBranch } = ModalStore.getState();
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
            
            const check = await getBranchByLocation(branch || selectedItem.branchLocation);
            //console.log(check.clerks.some(d => d.Id === selectedItem._id));
            if (check.clerks.some(d => d.Id === selectedItem._id)) return toast.error(`${selectedItem.username} is already in this branch!`);
            
            

            //update the branch here

            if (branch) {
                setOldBranch(selectedItem.branchLocation);
                const updateBranch = await axiosInstance.post(UPDATEBRANCH.replace(':location', branch), {
                    Id: selectedItem._id,
                    Username: username || selectedItem.username,
                    email: email || selectedItem.email,
                    shift: shift || selectedItem.shift,
                    salary: salary || selectedItem.salary,
                    role: role || selectedItem.role,
                    phoneNumber: phoneNumber || selectedItem.phoneNumber
                });
                console.log(updateBranch);
            } else {
                return;
            }

            //console.log(updateOldBranch.data);
            
            const newUser = await axiosInstance.post(UPDATE_USER.replace(':id', selectedItem._id), payload);
            //console.log(newUser.data.data['branchLocation'], selectedItem.branchLocation);
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
            setServerError(true);
        }
    },

    getSingleUser: async (id) => {
        try {
            const user = await axiosInstance.get(GET_SINGLE_USER.replace(':id', id));
            set({singleUser: user.data.data});
            return user.data;
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
                set({errorUser: axiosError(error)});
            }
        }
    },

    deleteMultipleUsers: async (data) => {
        const { setServerError } = ModalStore.getState();
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
            setServerError(true);
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

        newSocket.on("recentActivity", (data) => {
            //console.log(data);
            const activity = data.message;
            if (data.userId === get().AuthUser._id) return;
            toast.success(activity);
            set({recentActivity: activity});
            return;
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect(); 
    }

}));

export default AuthStore;