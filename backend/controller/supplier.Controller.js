import ApiResponseModel from '../models/ApiResponseModel.js'
import Supplier from '../models/SupplierModel.js'
import Strings from '../strings/strings-codes.js'
import User from '../models/UserModel.js'
import SystemLogs from '../models/SystemLogs.js'

const { 
    ERROR, 
    ADDSUPPLIER, 
    ADDSUPPLIERLOG, 
    CREATED, 
    ADDSUPPLIERCODE, 
    INCORRECTFUNCCD,
    GETSUPPLIERCODE,
    SUCCESS,
    SUCCESS_MESS 
} = Strings;

export const addSupplier = async (req, res) => {
  try {
    const data = req.body
    const { userId } = req.user
    const user = await User.getSingleUser(userId);

    if (data.funcCd !== ADDSUPPLIERCODE) {
        return ApiResponseModel(res, ERROR, INCORRECTFUNCCD);
    }
    const supplier = await Supplier.addSupplier(data.body);

    const logPayload = {
      user: user.username,
      action: ADDSUPPLIERLOG,
      branchLocation: user.branchLocation,
      log: `${user.username} created a new supplier called ${data.body.supplierName}`
    };

    await SystemLogs.addLog(logPayload);
    ApiResponseModel(res, CREATED, ADDSUPPLIER, supplier);
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message);
  }
}

export const getSupplier = async (req, res) => {
    try {
        const data = req.query || {};
        const { selectedBranch = null } = data;
        const { funcCd } = req.params;  

        if (funcCd !== GETSUPPLIERCODE) {
            return ApiResponseModel(res, ERROR, INCORRECTFUNCCD);
        }

        const suppliers = await Supplier.getSuppliers(funcCd, selectedBranch);
        
        const tabledata = suppliers.map(d => ({
            id: d._id,
            supplierName: d.supplierName,
            contactNo: d.contactNo,
            email: d.email,
            category: d.category,
            branch: d.branch,
            status: d.status
        }));

        ApiResponseModel(res, SUCCESS, SUCCESS_MESS, {
            suppliers,
            tabledata
        });
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}