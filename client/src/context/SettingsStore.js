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
  settingsLoading: false,
  yesNoSettingsApply: false,
  yesNoSettingsReset: false,

  setYesNoSettingsApply: (val) => set({yesNoSettingsApply: val}),
  setYesNoSettingsReset: (val) => set({yesNoSettingsReset: val}),

  resetInputs : () => set({
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
      branchNameMax: 0,
      categoryEnabled: null,
      staffEnabled: null,
      branchEnabled: null,
      vipEnabled: null,
    },
  }),

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
    set({settingsLoading: true});
    try {
      const response = await axiosInstance.get(GETSETTINGS);
      set({settings: response.data});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      set({settingsLoading: false});
    }
  },

  setSettings: async() => {
    const { inputs, settings } = get();
    try {
      const payload = {
        inventorySettings: {
          lowStockThreshold: inputs.lowStockThreshold > 0 ? inputs.lowStockThreshold : settings.data.inventorySettings.lowStockThreshold,
          inputLength: {
            productName: inputs.productNameMax > 0 ? inputs.productNameMax : settings.data.inventorySettings.inputLength.productName,
            quantity: inputs.quantityMax > 0 ? inputs.quantityMax : settings.data.inventorySettings.inputLength.quantity,
            price: inputs.priceMax > 0 ? inputs.priceMax : settings.data.inventorySettings.inputLength.price
          }
        },
        categorySettings: {
          enabled: inputs.categoryEnabled,
          inputLength: {
            categoryName: inputs.categoryNameMax > 0 ? inputs.categoryNameMax : settings.data.categorySettings.inputLength.categoryName
          }
        },
        staffManagementSettings: {
          enabled: inputs.staffEnabled,
          inputLength: {
            username: inputs.staffUsernameMax > 0 ? inputs.staffUsernameMax : settings.data.staffManagementSettings.inputLength.username,
            password: inputs.staffPasswordMax > 0 ? inputs.staffPasswordMax : settings.data.staffManagementSettings.inputLength.password,
            firstName: inputs.staffFirstNameMax > 0 ? inputs.staffFirstNameMax : settings.data.staffManagementSettings.inputLength.firstName,
            middleName: inputs.staffMiddleNameMax > 0 ? inputs.staffMiddleNameMax : settings.data.staffManagementSettings.inputLength.middleName,
            lastName: inputs.staffLastNameMax > 0 ? inputs.staffLastNameMax : settings.data.staffManagementSettings.inputLength.lastName,
            address: inputs.staffAddressMax > 0 ? inputs.staffAddressMax : settings.data.staffManagementSettings.inputLength.address,
            salary: inputs.staffSalaryMax > 0 ? inputs.staffSalaryMax : settings.data.staffManagementSettings.inputLength.salary
          }
        },
        vipManagementSettings: {
          enabled: inputs.vipEnabled,
          inputLength: {
            firstName: Number(inputs.vipFirstNameMax > 0 ? inputs.vipFirstNameMax : settings.data.vipManagementSettings.inputLength.firstName),
            middleName: inputs.vipMiddleNameMax > 0 ? inputs.vipMiddleNameMax : settings.data.vipManagementSettings.inputLength.middleName,
            lastName: inputs.vipLastNameMax > 0 ? inputs.vipLastNameMax : settings.data.vipManagementSettings.inputLength.lastName,
            points: inputs.vipPointsMax > 0 ? inputs.vipPointsMax : settings.data.vipManagementSettings.inputLength.points
          }
        },
        branchSettings: {
          enabled: inputs.branchEnabled,
          inputLength: {
            branchLocation: inputs.branchNameMax > 0 ? inputs.branchNameMax : settings.data.branchSettings.inputLength.branchLocation
          }
        }
      };
      const response = await axiosInstance.post(UPDATESETTINGS.replace(':id', settings.data._id), payload);
      set({settings: response.data});
    } catch (error) {
      console.log(error);
    } finally {
      get().resetInputs();
      window.location.reload();
    }
  }
}));

export default SettingsStore;