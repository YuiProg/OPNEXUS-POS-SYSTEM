import mongoose from "mongoose"
import Strings from "../strings/strings-codes.js";
import { customAlphabet } from "nanoid";

const {
    ID_SECRET
} = Strings;

const nanoid = customAlphabet(ID_SECRET, 5);
/**
 * @model 
 */
const systemLogsSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => `LG-${nanoid()}`
    },
    user: {
        type: String,
        required: true  
    },
    action: {
        type: String,
        required: true
    },
    branchLocation: {
        type: String,
    },
    log: {
        type: String,
        required: true
    }
}, {timestamps: true});

systemLogsSchema.statics.addLog = async function (data) {
    const newLog = await this.create(data);
    return newLog;
}

systemLogsSchema.statics.getLogs = async function (branch) {
    const hasBranch = branch && branch !== "null" && branch !== "Branch" && branch !== "any" ? { branchLocation: branch } : {};
    const logs = await this.find(hasBranch);
    return logs;
}

const SystemLogs = mongoose.model('systemlogs', systemLogsSchema);

export default SystemLogs;