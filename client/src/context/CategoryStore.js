import { create } from "zustand";
import axiosError from "../helpers/axiosError";
import toast from "react-hot-toast";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import AuthStore from "./Authstore";
import ModalStore from "./ModalStore";

const {
    CREATECATEGORY,
    GETCATEGORIES,
    DELETECATEGORY
} = ApiConfig;

const CategoryStore = create((set, get) => ({
    categoryName: '',
    categLoading: false,
    categories: [],

    setCategoryName: (val) => set({categoryName: val}),

    addCategory: async () => {
        const { setShowNewCategoryModal } = ModalStore.getState();
        try {
            set({categLoading: true});
            const catName = get().categoryName;
            const {AuthUser} = AuthStore.getState();
            const payload = {
                categoryName: catName,
                createdBy: AuthUser.username
            };
            const newCateg = await axiosInstance.post(CREATECATEGORY, payload);
            toast.success(newCateg.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({categLoading: false});
            setShowNewCategoryModal(false);
            get().getCategories();
        }
    },

    getCategories: async () => {
        try {
            const categories = await axiosInstance.get(GETCATEGORIES);
            const categoriesData = categories.data.data;
            /* eslint-disable-next-line*/
            const cleanedData = categoriesData.map(({_id, Id, __v, updatedAt, createdById, createdAt, ...rest}) => ({
                ...rest,
                createdAt: new Date(createdAt).toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })
            }));
            
            set({categories: cleanedData});
        } catch (error) {
            if (axiosError(error)) {
                //toast.error(error.response.data.status);
            }
        }
    },

    deleteCategory: async () => {
        const { selectedItem, setShowConfirmDeleteCategory } = ModalStore.getState();
        try {
            const res = await axiosInstance.post(DELETECATEGORY.replace(':name', selectedItem.categoryName));
            toast.success(res.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            setShowConfirmDeleteCategory(false);
            get().getCategories();
        }
    }
}));

export default CategoryStore;