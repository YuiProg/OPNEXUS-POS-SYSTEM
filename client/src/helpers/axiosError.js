import { isAxiosError } from "axios";
import Strings from "../strings/strings-codes";

const {SERVER_ERROR} = Strings;

const axiosError = (err) => {
    if (isAxiosError(err)) {
        return err.response?.data;
    } else {
        return SERVER_ERROR;
    }
}

export default axiosError;