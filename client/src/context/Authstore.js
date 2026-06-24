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
    UPDATEBRANCH,
    REMOVEADMINFROMBRANCH,
    CHANGEPASSWORD,
    VALIDATEUSER,
    GETACTIVEUSERS
} = ApiConfig;

const {
    SUCCESS_MESS
} = Strings;

const AuthStore = create((set, get) => ({
    AuthUser: null,
    AuthLoading: true,
    errorUser: null,
    selectedBranch: localStorage.getItem('selectedBranch') 
    ? JSON.parse(localStorage.getItem('selectedBranch')) 
    : null,
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
        salary: null,
        sendEmail: false
    },
    users: [],
    onlineUsers: [],
    fetchLoading: false,
    recentActivity: null,
    singleUser: null,
    changePasswordModal: false,
    changePasswordInput: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    },
    changePasswordLoading: false,
    steps: 1,
    validateData: null,
    activeUsers: [],

    setValidateData: (data) => set({validateData: data}),

    setStep: (val) => set({steps: val}),

    getActiveUsers: async () => {
        try {
            const activeUsers = await axiosInstance.get(GETACTIVEUSERS);
            set({activeUsers: activeUsers.data.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        }
    },

    validateDataFunc: async () => {
        const {isScreenLoading} = ModalStore.getState();
        isScreenLoading(true);
        set({authLoading: true});
        const inputs = get().input;
        try {
            const validate = await axiosInstance.post(VALIDATEUSER, inputs);
            set({validateData: validate.data});
            return validate.data;
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({authLoading: false});
            isScreenLoading(false);
        }
    },

    setChangePasswordInput: (name, value) => {
        console.log(value);
        const inputs = get().changePasswordInput;
        inputs[name] = value;
        set({changePasswordInput: inputs});
    },

    setChangePasswordModal: (val) => set({changePasswordModal: val}),

    removeSelectedBranch: () => {
        localStorage.removeItem('selectedBranch');
        set({selectedBranch: null});
    },

    setSelectedBranch: (val) => {
        if (val === "all") {
            get().removeSelectedBranch();
            window.location.reload();
            return;
        }
        console.log(val);
        localStorage.setItem('selectedBranch', JSON.stringify(val));
        set({selectedBranch: val});
        window.location.reload();
    },

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

            localStorage.removeItem('selectedBranch');
            set({ AuthUser: null, selectedBranch: null });

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

    changePassword: async () => {
        const { setServerError } = ModalStore.getState();
        const { currentPassword, confirmPassword, newPassword } = get().changePasswordInput;
        set({changePasswordLoading: true});
        try {
            if (newPassword !== confirmPassword) {
                toast.error("New password and confirm password do not match!");
                return;
            }
            const { AuthUser } = AuthStore.getState();
            const res = await axiosInstance.post(CHANGEPASSWORD.replace(':id', AuthUser._id), {
                currentPassword,
                newPassword,
                oldPassword: currentPassword
            });
            if (res.data.status === SUCCESS_MESS) {
                set({changePasswordModal: false, changePasswordInput: {
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }});
                toast.success("Password changed successfully!");
                get().logoutUser();
            }
        } catch (error) {
            toast.error(error.response.data.status);
            set({errorUser: axiosError(error)});
            setServerError(true);
        } finally {
            set({changePasswordLoading: false});
        }
    },

    addUser: async () => {
        const { setShowAddModal, setServerError, isScreenLoading } = ModalStore.getState();

        //const { getBranchByLocation } = BranchStore.getState();
        try {
            isScreenLoading(true);
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
                address: data.address,
                sendEmail: data.sendEmail
            };
            const payloadClerk = {
                username: data.username,
                email: data.email,
                password: data.password,
                //branchLocation: 'ADMIN',
                shift: data.shift,
                salary: Number(data.salary),
                phoneNumber: Number(data.phoneNumber),
                role: data.role,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                gender: data.gender,
                address: data.address,
                sendEmail: data.sendEmail
            };

            //get muna yung branch check kung may laman na
            // if (isAdmin !== "Admin") {
            //     const check = await getBranchByLocation(data.branch);
            //     if (check.clerkName) {
            //         return toast.error('Branch already has a user!');
            //     }
            // }
            let user;
            
            if (data.role === "Admin") {
                const newUserAdmin = await axiosInstance.post(addUser, payloadAdmin);
                user = newUserAdmin
            } else if (data.role === "Clerk") {
                const newUserAdmin = await axiosInstance.post(addUser, payloadClerk);
                user = newUserAdmin
                console.log(newUserAdmin.data);
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
                shift: shift,
                salary: salary,
                role: role,
                phoneNumber: phoneNumber,
                branchlocation: branchLocation || 'N/A',
            };
            

            set((state) => ({users: [newData, ...state.users]}));
            toast.success('New user added');
            // if (newUser.data.status === "Success") {
            //     window.location.reload();
            // }
            setShowAddModal(false);
        } catch (error) {
            toast.error(error.response.data.status);
            set({errorUser: axiosError(error)});
            setServerError(true);
        } finally {
            isScreenLoading(false);
            get().resetInput();
        }
    },

    fetchUsers: async () => {
        set({fetchLoading: true});
        const { setServerError } = ModalStore.getState();
        try {
            const users = await axiosInstance.get(fetchUsers.replace(':branch', get().selectedBranch));
            const data = users.data.data;
            const userId = get().AuthUser._id;
            /* eslint-disable no-unused-vars */
            const cleanedData = data
            .filter((user) => user._id !== userId)
            .map(({ 
                Employee, 
                username, 
                timedIn, 
                time, 
                createdAt, 
                createdById, 
                updatedAt, 
                __v, 
                firstName, 
                _id, 
                middleName, 
                gender, 
                lastName, 
                address, 
                ...rest }) => ({
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
        const { getBranchByLocation, removeUserFromBranch } = BranchStore.getState();
        const { setServerError, isScreenLoading } = ModalStore.getState();
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
            isScreenLoading(true);
            const hasNoChanges = Object.values({
                username, email, firstName, middleName,
                lastName, gender, address, role, shift,
                salary, branch, phoneNumber
            }).every(val => !val || val.trim() === '');

            if (hasNoChanges) return toast.error('Nothing to update!');
            
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
            
            await getBranchByLocation(branch || selectedItem.branchLocation);
            //console.log(check.clerks.some(d => d.Id === selectedItem._id));
            //if (check.clerks.some(d => d.Id === selectedItem._id)) return toast.error(`${selectedItem.username} is already in this branch!`);
            setOldBranch(selectedItem.branchLocation);
            if (role === 'Admin') {
                //console.log(selectedItem);
                payload.branchLocation = 'N/A';
                await axiosInstance.post(REMOVEADMINFROMBRANCH.replace(':location', selectedItem.branchLocation), selectedItem);
            }
            //update the branch here

            if (branch) {
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
            console.log(error);
            toast.error(error.message);
            set({errorUser: axiosError(error)});
            setServerError(true);
        } finally {
            isScreenLoading(false);
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
        const { setServerError, isScreenLoading } = ModalStore.getState();
        const ids = data.map((i, _) => i.Id);
        try {
            isScreenLoading(true);
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
        } finally {
            isScreenLoading(false);
        }
    },

    deleteUser : async (id) => {
        const {setYesNoModal, isScreenLoading} = ModalStore.getState();
        try {
            isScreenLoading(true);
            const result = await axiosInstance.post(ApiConfig.deleteSingleUser, { id });
            if (result.data.status === "Success") {
                const users = get().users;
                const newData = users.filter((d) => d.Id !== id);
                set({users: newData});
                toast.success('User deleted');
            }
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
                set({errorUser: axiosError(error)});
            }

        } finally {
            setYesNoModal(false);
            isScreenLoading(false);
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