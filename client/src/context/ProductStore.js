import { create } from "zustand";
import AuthStore from "./Authstore";
import axiosInstance from "../helpers/axiosInstance";
import ApiConfig from "../Api/ApiConfig";
import axiosError from "../helpers/axiosError";
import ModalStore from "./ModalStore";

const {
 addProduct,
 fetchProduct
} = ApiConfig;

const ProductStore = create((set, get) => ({
  productName: '',
  quantity: 0,
  price: 0,
  category: '',
  image: null,
  productBranch: 'any',
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
      // eslint-disable-next-line no-unused-vars
      const { createdAt, createdById, _id, updatedAt, __v, ...rest } = newProduct.data.data;
      set((state) => ({ products: [...state.products, rest] }));
    } catch (error) {
      set({errorProduct: axiosError(error)});
    } finally {
      set({addLoading: false});
      setModal(false);
      window.location.reload();
    }
  },

  fetchProducts: async () => {
    try {
      const {productBranch} = get();
      const products = await axiosInstance.get(fetchProduct, {
        params: {
          selectedBranch: productBranch
        }
      });
      //console.log(products.data.data);
      const data = products.data.data;
      // eslint-disable-next-line no-unused-vars
      const cleanedData = data.map(({createdAt, createdById, _id, updatedAt, __v, ...rest}) => rest);
      set({products: cleanedData});
    } catch (error) {
      console.log(error);
      set({errorProduct: axiosError(error)});
    }
  }
}));

export default ProductStore;