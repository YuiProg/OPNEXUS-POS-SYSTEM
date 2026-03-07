import Product from "../models/Products.js"
import Strings from "../strings/strings.js";

const {
    ERROR,
    SERVER_ERROR,
    CREATED,
    NEW_PRODUCT
} = Strings;

export const newProduct = async (req, res) => {
    const data = req.body;
    try {
        const newProduct = await Product.addProduct(data);
        res.status(CREATED).json(
            {
                success: true, 
                message: NEW_PRODUCT, 
                data: newProduct
            }
        );
    } catch (error) {
        res.status(ERROR).json(
            {
                success: false, 
                message: SERVER_ERROR, 
                err: err.message
            }
        );
    }
}