import mongoose from 'mongoose';

const SystemSettingsSchema = new mongoose.Schema({
    inventorySettings: {
        lowStockThreshold: {
            type: Number,
            default: 10
        },
        inputLength: {
            productName: {
                type: Number,
                default: 10
            },
            quantity: {
                type: Number,
                default: 5
            },
            price: {
                type: Number,
                default: 4
            }
        }
    },
    categorySettings: {
        enabled: {
            type: Boolean,
            default: true
        },
        inputLength: {
            categoryName: {
                type: Number,
                default: 10
            }
        }
    },
    staffManagementSettings: {
        enabled: {
            type: Boolean,
            default: true
        },
        inputLength: {
            username: {
                type: Number,
                default: 10
            },
            password: {
                type: Number,
                default: 10
            },
            firstName: {
                type: Number,
                default: 10
            },
            middleName: {
                type: Number,
                default: 10
            },
            lastName: {
                type: Number,
                default: 10
            },
            address: {
                type: Number,
                default: 20
            },
            salary: {
                type: Number,
                default: 10
            }
        },
        VipManagementSettings: {
            enabled: {
                type: Boolean,
                default: true
            },
            vipIdInputField: {
                enabled: {
                    type: Boolean,
                    default: true
                }
            },
            inputLength: {
                firstName: {
                    type: Number,
                    default: 10
                },
                middleName: {
                    type: Number,
                    default: 10
                },
                lastName: {
                    type: Number,
                    default: 10
                },
                emailRequired: {
                    type: Boolean,
                    default: true
                },
                contactNoRequired: {
                    type: Boolean,
                    default: true
                },
                points: {
                    type: Number,
                    default: 4
                }
            }
        },
        branchSettings: {
            enabled: {
                type: Boolean,
                default: true
            },
            inputLength: {
                branchLocation: {
                    type: Number,
                    default: 5
                },
            }
        }
    }
});

const SystemSettings = mongoose.model('SystemSettings', SystemSettingsSchema);

export default SystemSettings;