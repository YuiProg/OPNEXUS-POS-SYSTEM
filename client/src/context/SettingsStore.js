import { create } from 'zustand';
import ApiConfig from '../Api/ApiConfig';
import axiosInstance from '../helpers/axiosInstance';
import toast from 'react-hot-toast';

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

  setYesNoSettingsApply: (val) => set({ yesNoSettingsApply: val }),
  setYesNoSettingsReset: (val) => set({ yesNoSettingsReset: val }),

  resetInputs: () => set({
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

  setInputs: (name, value) => {
    const inputs = get().inputs;
    inputs[name] = value;
    set({ inputs: inputs });
  },

  resetSettings: async () => {
    try {
      const response = await axiosInstance.post(RESETSETTINGS);
      console.log(response.data);
      set({ settings: response.data });
      toast.success(response.data.status);
    } catch (error) {
      console.log(error);
    }
  },

  getSettings: async () => {
    set({ settingsLoading: true });
    try {
      const response = await axiosInstance.get(GETSETTINGS);
      set({ settings: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      set({ settingsLoading: false });
    }
  },

  setSettings: async (data) => {
    const { settings } = get();
    try {
      const payload = {
        inventorySettings: {
          lowStockThreshold: data.lowStockThreshold > 0 ? data.lowStockThreshold : settings.data.inventorySettings.lowStockThreshold,
          inputLength: {
            productName: data.productNameMax > 0 ? data.productNameMax : settings.data.inventorySettings.inputLength.productName,
            quantity: data.quantityMax > 0 ? data.quantityMax : settings.data.inventorySettings.inputLength.quantity,
            price: data.priceMax > 0 ? data.priceMax : settings.data.inventorySettings.inputLength.price,
          }
        },
        categorySettings: {
          enabled: data.categoryEnabled,
          inputLength: {
            categoryName: data.categoryNameMax > 0 ? data.categoryNameMax : settings.data.categorySettings.inputLength.categoryName,
          }
        },
        staffManagementSettings: {
          enabled: data.staffEnabled,
          inputLength: {
            username: data.staffUsernameMax > 0 ? data.staffUsernameMax : settings.data.staffManagementSettings.inputLength.username,
            password: data.staffPasswordMax > 0 ? data.staffPasswordMax : settings.data.staffManagementSettings.inputLength.password,
            firstName: data.staffFirstNameMax > 0 ? data.staffFirstNameMax : settings.data.staffManagementSettings.inputLength.firstName,
            middleName: data.staffMiddleNameMax > 0 ? data.staffMiddleNameMax : settings.data.staffManagementSettings.inputLength.middleName,
            lastName: data.staffLastNameMax > 0 ? data.staffLastNameMax : settings.data.staffManagementSettings.inputLength.lastName,
            address: data.staffAddressMax > 0 ? data.staffAddressMax : settings.data.staffManagementSettings.inputLength.address,
            salary: data.staffSalaryMax > 0 ? data.staffSalaryMax : settings.data.staffManagementSettings.inputLength.salary,
          }
        },
        vipManagementSettings: {
          enabled: data.vipEnabled,
          inputLength: {
            firstName: Number(data.vipFirstNameMax > 0 ? data.vipFirstNameMax : settings.data.vipManagementSettings.inputLength.firstName),
            middleName: data.vipMiddleNameMax > 0 ? data.vipMiddleNameMax : settings.data.vipManagementSettings.inputLength.middleName,
            lastName: data.vipLastNameMax > 0 ? data.vipLastNameMax : settings.data.vipManagementSettings.inputLength.lastName,
            points: data.vipPointsMax > 0 ? data.vipPointsMax : settings.data.vipManagementSettings.inputLength.points,
          }
        },
        branchSettings: {
          enabled: data.branchEnabled,
          inputLength: {
            branchLocation: data.branchNameMax > 0 ? data.branchNameMax : settings.data.branchSettings.inputLength.branchLocation,
          }
        }
      };
      const response = await axiosInstance.post(UPDATESETTINGS.replace(':id', settings.data._id), payload);
      set({ settings: response.data });
      toast.success(response.data.status);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update settings.');
    } finally {
      get().resetInputs();
      await get().getSettings();
    }
  }
}));

export default SettingsStore;