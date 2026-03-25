import { create } from "zustand";

const ProductStore = create((set) => ({
  productName: '',
  quantity: 0,
  setProductData: (name, value) => {
    set({[name]:value})
  }
}));

export default ProductStore;