import mongoose from 'mongoose'

const SystemSettingsSchema = new mongoose.Schema({
  generalSettings: {
    systemName: {
      type: String,
      default: 'POS SYSTEM',
    },
    maxLoginAttempts: {
      type: Number,
      default: 3
    },
    turnOffPOS: {
      type: Boolean,
      default: false
    },
    allowAccountLocking: {
      type: Boolean,
      default: true
    }
  },
  inventorySettings: {
    topProductsThreshold: {
      type: Number,
      default: 15
    },
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
      }
    }
  },
  vipManagementSettings: {
    enabled: {
      type: Boolean,
      default: true
    },
    vipIdInputField: {
      type: Boolean,
      default: true
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
  }
});

SystemSettingsSchema.statics.getSettings = async function () {
  const settings = await this.findOne();
  return settings;
}

const SystemSettings = mongoose.model('SystemSettings', SystemSettingsSchema)

export default SystemSettings
