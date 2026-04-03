import { create } from "zustand";
import AuthStore from "./Authstore";
import axiosInstance from "../helpers/axiosInstance";
import ApiConfig from "../Api/ApiConfig";
import axiosError from "../helpers/axiosError";
import ModalStore from "./ModalStore";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";

const {
  addProduct,
  fetchProduct,
  deleteMultipleProduct,
  deleteSingleProduct,
  fetchSingleProduct,
  UPDATEPRODUCT,
} = ApiConfig;

const ProductStore = create((set, get) => ({
  productName: "",
  fetchLoading: false,
  quantity: 0,
  price: 0,
  category: "",
  image: null,
  productBranch: "",
  products: [],
  branches: [
    "VAPORYA X VAPESTA",
    "VAPORYA BALOT SAN AGUSTIN",
    "VAPORYA LONGOS MALOLOS",
    "VAPORYA STA MARIA",
    "VAPORYA TANGOS",
    "VAPORYA GATBUCA",
    "VAPORYA X VAPESTA PALIPARAN",
    "VAPORYA X VAPESTA BULIHAN",
  ],
  categories: [
    "Juice",
    "Device",
    "Cartridge",
    "Pods",
    "Vape",
    "Automizer",
    "Mod",
    "Battery",
    "Wire",
    "Cotton",
    "Drip Tip",
  ],
  addLoading: false,
  errorProduct: null,

  setProductData: (name, value) => {
    set({ [name]: value });
  },

  //TODO: IMAGE VALIDATION
  addNewProduct: async () => {
    const { productName, quantity, category, price, productBranch, image } =
      get();
    const { AuthUser } = AuthStore.getState();
    const { setModal } = ModalStore.getState();
    const payload = {
      productName,
      quantity,
      category,
      price,
      image,
      creatorName: AuthUser.username,
      productBranch,
    };

    set({ addLoading: true });

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
        category: data.category,
        price: data.price,
      };

      set((state) => ({ products: [newData, ...state.products] }));
      toast.success("Product added");
    } catch (error) {
      toast.error(error.message);
      set({ errorProduct: axiosError(error) });
    } finally {
      set({ addLoading: false });
      set({ image: null });
      setModal(false);
    }
  },

  fetchProducts: async () => {
    set({fetchLoading: true});
    try {
      const { selectedBranch } = AuthStore.getState();
      console.log(selectedBranch);
      const products = await axiosInstance.get(fetchProduct, {
        params: {
          selectedBranch: selectedBranch,
        },
      });
      //console.log(products.data.data);
      const data = products.data.data;
      console.log(data);

      //PANG REMOVE NG UNNECESSARY DATA SA RESPONSE, MAP PARA MA LOOP SA BAWAT ITEM SA ARRAY
      /* eslint-disable no-unused-vars */
      const cleanedData = data.map(
        ({
          createdAt,
          productName,
          creatorName,
          productBranch,
          createdById,
          _id,
          productImage,
          productImageId,
          updatedAt,
          Creator,
          __v,
          ...rest
        }) => rest,
      );
      set({ products: cleanedData });
      console.log(cleanedData);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({ errorProduct: axiosError(error) });
    } finally {
      set({fetchLoading: false});
    }
  },

  fetchProductSingle: async (id) => {
    try {
      set({ addLoading: true });
      const product = await axiosInstance.get(
        fetchSingleProduct.replace(":id", id),
      );
      const res = product.data;
      return res;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({ errorProduct: axiosError(error) });
    } finally {
      set({ addLoading: false });
    }
  },

  updateProduct: async () => {
    try {
      const { productName, quantity, category, price, image, productBranch } =
        get();
      const {
        selectedItem,
        setUpdatedItem,
        setEditProductModal,
        setChangesModal,
      } = ModalStore.getState();
      const payload = {
        productName: productName || selectedItem.productName,
        quantity: quantity || selectedItem.quantity,
        category: category || selectedItem.category,
        price: price || selectedItem.price,
        image: image || selectedItem.productImage,
        imageId: selectedItem.productImageId,
        productBranch: productBranch || selectedItem.productBranch,
      };
      const result = await axiosInstance.post(
        ApiConfig.UPDATEPRODUCT.replace(":id", selectedItem._id),
        payload,
      );
      set({productName: "", quantity: 0, category: "", price: 0, image: null, productBranch: ""});
      const data = result.data;
      setUpdatedItem(data);
      setEditProductModal(false);
      setChangesModal(true);
      toast.success("Product updated");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({ errorProduct: axiosError(error) });
    } finally {
      get().fetchProducts();
      set({ image: null });
    }
  },

  deleteMultipleProducts: async (data) => {
    set({addLoading: true});
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
    } finally {
      set({addLoading: false});
    }
  },

  //UNDEFINED YUNG ID DAW PUTANGINA
  deleteProduct: async () => {
    const { selectedItem, setYesNoModal } = ModalStore.getState();

    try {
      const result = await axiosInstance.post(deleteSingleProduct, {
        id: selectedItem.Id,
      });

      if (result.data.status === "Success") {
        const products = get().products;
        const newData = products.filter((p) => p.Id !== selectedItem.Id);
        set({ products: newData });
        toast.success("Product deleted");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      set({ errorProduct: axiosError(error) });
    } finally {
      setYesNoModal(false);
    }
  },

  subscribeToProducts: () => {
    const { AuthUser, socket } = AuthStore.getState();

    if (!AuthUser?._id || !socket) return; 

    socket.off("newProduct");

    socket.on("newProduct", (data) => {
      if (data.userId === AuthUser._id) return;
      const cleanedData = data._doc;
      const newData = {
        Id: cleanedData._id,
        Name: cleanedData.productName.toUpperCase(),
        Branch: cleanedData.productBranch,
        quantity: cleanedData.quantity,
        category: cleanedData.category,
        price: cleanedData.price,
      };
      set((state) => ({ products: [newData, ...state.products] }));
    });
  },

  unsubscribeToProducts: () => {
    const {socket} = AuthStore.getState();
    if (!socket) return;
    socket.off("newProduct");
  }
}));

export default ProductStore;
