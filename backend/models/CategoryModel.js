import mongoose from 'mongoose'
import Strings from '../strings/strings-codes.js';
import { customAlphabet } from 'nanoid';

const {
    ID_SECRET
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 5);
/**
 * @model 
 */
const categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `CA-${nanoid()}`
    },
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdById: {
        type: String,
        required: true
    }
}, {timestamps: true});

categorySchema.statics.addCategory = async function (data) {
    const newCateg = await this.create(data);
    return newCateg;
}

categorySchema.statics.getCategories = async function () {
    const categs = await this.find({}).sort({createdAt: -1});
    return categs;
}

categorySchema.statics.deleteCategory = async function (name) {
    const res = await this.findOneAndDelete({categoryName: name});
    return res;
}

const Category = mongoose.model('category', categorySchema);

export default Category;