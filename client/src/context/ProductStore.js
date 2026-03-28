import { create } from "zustand";
import AuthStore from "./Authstore";
import axiosInstance from "../helpers/axiosInstance";
import ApiConfig from "../Api/ApiConfig";
import axiosError from "../helpers/axiosError";
import ModalStore from "./ModalStore";
import toast from "react-hot-toast";

const {
 addProduct,
 fetchProduct,
 deleteMultipleProduct
} = ApiConfig;

const ProductStore = create((set, get) => ({
  productName: '',
  quantity: 0,
  price: 0,
  category: '',
  image: null,
  productBranch: '',
  products: [],
  branches: [
    'VAPORYA X VAPESTA',
    'VAPORYA BALOT SAN AGUSTIN',
    'VAPORYA LONGOS MALOLOS',
    'VAPORYA STA MARIA',
    'VAPORYA TANGOS',
    'VAPORYA GATBUCA',
    'VAPORYA X VAPESTA PALIPARAN',
    'VAPORYA X VAPESTA BULIHAN'
  ],
  categories: [
    'Juice',
    'Device',
    'Cartridge',
    'Pods',
    'Vape',
    'Automizer',
    'Mod',
    'Battery',
    'Wire',
    'Cotton',
    'Drip Tip'
  ],
  addLoading: false,
  errorProduct: null,

  setProductData: (name, value) => {
    set({[name]:value});
  },

  //TODO: IMAGE VALIDATION
  addNewProduct: async () => {
    const {productName, quantity, category, price, productBranch} = get();
    const { AuthUser } = AuthStore.getState();
    const { setModal } = ModalStore.getState();
    const payload = {
      productName,
      quantity,
      category,
      price,
      creatorName: AuthUser.username,
      productBranch
    }

    set({addLoading: true});

    try {
      const newProduct = await axiosInstance.post(addProduct, payload);
      const data = newProduct.data.data;

      // const { createdAt, productName: pn, creatorName, productBranch: pb, createdById, _id, updatedAt, __v, ...rest } = data;
      // rest.Id = _id;
      // rest.Creator = AuthUser.username,
      // rest.Category
      // const new = {
      
      // }

      const newData = {
        Id: data._id,
        Name: data.productName.toUpperCase(),
        //Creator: data.creatorName,
        Branch: data.productBranch,
        quantity: data.quantity,
        price: data.price,
        category: data.category
      };

      set((state) => ({ products: [newData, ...state.products] }));
      toast.success('Product added');
    } catch (error) {
      toast.error(error.message);
      set({errorProduct: axiosError(error)});
    } finally {
      set({addLoading: false});
      setModal(false);
    }
  },

  fetchProducts: async () => {
    try {
      const {selectedBranch} = AuthStore.getState();
      console.log(selectedBranch);
      const products = await axiosInstance.get(fetchProduct, {
        params: {
          selectedBranch: selectedBranch
        }
      });
      //console.log(products.data.data);
      const data = products.data.data;
      console.log(data);
      // eslint-disable-next-line no-unused-vars
      const cleanedData = data.map(({createdAt, productName, creatorName, productBranch, createdById, _id, updatedAt, Creator, __v, ...rest}) => rest);
      set({products: cleanedData});
      console.log(cleanedData);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({errorProduct: axiosError(error)});
    }
  },

  deleteMultipleProducts: async (data) => {
    try {
      const list = data.map((d) => d.Id);
      const result = await axiosInstance.post(deleteMultipleProduct, list);
      
      if (result.data.status === "Success") {
        const products = get().products;
        const deleted = products.filter((p) => !list.includes(p.Id));

        const { setDeleteModal, setConfirmModal } = ModalStore.getState();
        setDeleteModal(false);
        setConfirmModal(true);
        set({ products: deleted });
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({ errorProduct: axiosError(error) });
    }
  }

}));

export default ProductStore;