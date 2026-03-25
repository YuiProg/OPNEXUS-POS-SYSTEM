import { create } from "zustand";
import AuthStore from "./Authstore";
import axiosInstance from "../helpers/axiosInstance";
import ApiConfig from "../Api/ApiConfig";
import axiosError from "../helpers/axiosError";

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
  addLoading: true,
  errorProduct: null,

  setProductData: (name, value) => {
    set({[name]:value});
  },

  //TODO: IMAGE VALIDATION
  addNewProduct: async () => {
    const {productName, quantity, category, image, price, productBranch} = get();
    const { AuthUser } = AuthStore.getState();
    
    const payload = {
      productName,
      quantity,
      category,
      price,
      creatorName: AuthUser.username,
      productBranch
    }

    try {
      const newProduct = await axiosInstance.post(addProduct, payload);
      console.log(newProduct.data);  
    } catch (error) {
      set({errorProduct: axiosError(error)});
    } finally {
      set({addLoading: false});
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
      set({products: products.data});
    } catch (error) {
      console.log(error);
      set({errorProduct: axiosError(error)});
    }
  }
}));

export default ProductStore;