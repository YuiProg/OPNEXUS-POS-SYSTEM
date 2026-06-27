import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import Strings from "../strings/strings-codes";

const {
    ID_SECRET
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 4);

const supplierSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `SP-${nanoid()}`
    },
    supplierName: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    items: {
        type: Number,
        default: 0
    },
    branch: {
        type: String,
        default: 'N/A'
    },
    status: {
        type: String,
        required: true
    }
});

const Supplier = mongoose.model('supplier', supplierSchema);

export default Supplier;