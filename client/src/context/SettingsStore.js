import { create } from 'zustand';
import ApiConfig from '../Api/ApiConfig';
import axiosInstance from '../helpers/axiosInstance';
import toast from 'react-hot-toast';
import StaffManagement from '../pages/StaffManagement/StaffManagement';

const {
  GETSETTINGS,
  UPDATESETTINGS,
  RESETSETTINGS
} = ApiConfig;

const SettingsStore = create((set, get) => ({
  inputs: {
    lowStockThreshold: 0,
    productNameMax: 0,
    quantityMax: 0,
    priceMax: 0,
    categoryNameMax: 0,
    staffUsernameMax: 0,
    staffPasswordMax: 0,
    staffFirstNameMax: 0,
    staffMiddleNameMax: 0,
    staffLastNameMax: 0,
    staffAddressMax: 0,
    staffSalaryMax: 0,
    vipFirstNameMax: 0,
    vipMiddleNameMax: 0,
    vipLastNameMax: 0,
    vipPointsMax: 0,
    branchNameMax: 0
  },
  settings: null,

  setInputs : (name, value) => {
    const inputs = get().inputs;
    inputs[name] = value;
    set({inputs: inputs});
  },
  resetSettings : async() => {
    try {
      const response = await axiosInstance.post(RESETSETTINGS);
      console.log(response.data);
      set({settings: response.data});
      toast.success(response.data.status);
    } catch (error) {
      console.log(error);
    }
  },

  getSettings : async() => {
    try {
      const response = await axiosInstance.get(GETSETTINGS);
      set({settings: response.data});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  setSettings: async() => {
    const { inputs, settings } = get();
    try {
      const payload = {
        inventorySettings: {
          lowStockThreshold: inputs.lowStockThreshold,
          inputLength: {
            productName: inputs.productNameMax,
            quantity: inputs.quantityMax,
            price: inputs.priceMax
          }
        },
        categorySettings: {
          inputLength: {
            categoryName: inputs.categoryNameMax
          }
        },
        staffManagementSettings: {
          inputLength: {
            username: inputs.staffUsernameMax,
            password: inputs.staffPasswordMax,
            firstName: inputs.staffFirstNameMax,
            middleName: inputs.staffMiddleNameMax,
            lastName: inputs.staffLastNameMax,
            address: inputs.staffAddressMax,
            salary: inputs.staffSalaryMax
          }
        },
        vipManagementSettings: {
          inputLength: {
            firstName: inputs.vipFirstNameMax,
            middleName: inputs.vipMiddleNameMax,
            lastName: inputs.vipLastNameMax,
            points: inputs.vipPointsMax
          }
        },
        branchSettings: {
          inputLength: {
            branchName: inputs.branchNameMax
          }
        }
      };
      const response = await axiosInstance.post(UPDATESETTINGS.replace(':id', settings.data._id), payload);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}));

export default SettingsStore;