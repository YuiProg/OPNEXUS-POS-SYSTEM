import React from 'react'
import './Settings.css'
import { InputRow } from '../../components/TRInputForm/TRInputForm'
import InputField from '../../components/TRInputField/InputFIeld'
import { PanelPage } from '../../components/TRPanelPage/TRPanelPage'
import { Toggle, BooleanToggle } from '../../components/TRToggle/Toggle'
import SettingsStore from '../../context/SettingsStore'
import Button from '../../components/TRButton/Button'

class SettingsPage extends React.Component {
  constructor(props) {
    super(props)
    const { settingsProps } = props
    this.state = {
      selectedOption: 'Inventory',
      storeState: SettingsStore.getState(),
      // toggles
      categoryEnabled: settingsProps.categorySettings?.enabled ?? false,
      staffEnabled: settingsProps.staffManagementSettings?.enabled ?? false,
      branchEnabled: settingsProps.branchSettings?.enabled ?? false,
      vipEnabled: settingsProps.vipManagementSettings?.enabled ?? false,
      vipIdInputEnabled: settingsProps.vipManagementSettings?.vipIdInputEnabled ?? false,
      // category
      categoryNameMax: 0,
      // inventory
      lowStockThreshold: 0,
      productNameMax: 0,
      quantityMax: 0,
      priceMax: 0,
      // vip
      vipFirstNameMax: 0,
      vipMiddleNameMax: 0,
      vipLastNameMax: 0,
      vipPointsMax: 0,
      // staff
      staffUsernameMax: 0,
      staffPasswordMax: 0,
      staffFirstNameMax: 0,
      staffMiddleNameMax: 0,
      staffLastNameMax: 0,
      staffAddressMax: 0,
      staffSalaryMax: 0,
      // branch
      branchNameMax: 0,
    }
  }

  componentDidMount() {
    this.unsubscribe = SettingsStore.subscribe(() => {
      this.setState({ storeState: SettingsStore.getState() })
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  handleSettingsOptionClick = (option) => {
    this.setState({ selectedOption: option })
  }

  categoryPanel = () => {
    const { settingsProps } = this.props
    return (
      <div className="settings-content">
        <h2 className="option-title">Categories Settings</h2>
        <InputRow titles={['Enable']}>
          <BooleanToggle
            hideLabel
            value={this.state.categoryEnabled}
            onChange={(value) => this.setState({ categoryEnabled: value })}
          />
        </InputRow>
        <h4 className="option-subtitle">Maximum Character Limits for Categories</h4>
        <InputRow gap={10} titles={['Category Name']}>
          <InputField
            number
            onChange={(value) => this.setState({ categoryNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.categorySettings?.inputLength.categoryName}`}
            value={this.state.categoryNameMax > 0 ? this.state.categoryNameMax : ""}
          />
        </InputRow>
      </div>
    )
  }

  inventoryPanel = () => {
    const { settingsProps } = this.props
    return (
      <div className="settings-content">
        <h2 className="option-title">Inventory Settings</h2>
        <InputRow titles={['Low Stock Threshold']}>
          <InputField
            number
            onChange={(value) => this.setState({ lowStockThreshold: value })}
            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.lowStockThreshold}`}
            value={this.state.lowStockThreshold > 0 ? this.state.lowStockThreshold : ""}
          />
        </InputRow>
        <h4 className="option-subtitle">Maximum Character Limits for Items</h4>
        <InputRow gap={10} titles={['Product Name', 'Quantity', 'Price']}>
          <InputField
            number
            onChange={(value) => this.setState({ productNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.inputLength.productName}`}
            value={this.state.productNameMax > 0 ? this.state.productNameMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ quantityMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.inputLength.quantity}`}
            value={this.state.quantityMax > 0 ? this.state.quantityMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ priceMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.inputLength.price}`}
            value={this.state.priceMax > 0 ? this.state.priceMax : ""}
          />
        </InputRow>
      </div>
    )
  }

  vipManagementPanel = () => {
    const { settingsProps } = this.props
    return (
      <div className="settings-content">
        <h2 className="option-title">VIP Management Settings</h2>
        <InputRow titles={['Enable']}>
          <BooleanToggle
            value={this.state.vipEnabled}
            hideLabel
            onChange={(value) => this.setState({ vipEnabled: value })}
          />
        </InputRow>
        <InputRow titles={['Enable VIP ID Input Field']}>
          <BooleanToggle
            value={this.state.vipIdInputEnabled}
            hideLabel
            onChange={(value) => this.setState({ vipIdInputEnabled: value })}
          />
        </InputRow>
        <h4 className="option-subtitle">Maximum Character Limits for VIP Management</h4>
        <InputRow gap={10} titles={['First Name', 'Middle Name', 'Last Name']}>
          <InputField
            number
            onChange={(value) => this.setState({ vipFirstNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.firstName}`}
            value={this.state.vipFirstNameMax > 0 ? this.state.vipFirstNameMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ vipMiddleNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.middleName}`}
            value={this.state.vipMiddleNameMax > 0 ? this.state.vipMiddleNameMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ vipLastNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.lastName}`}
            value={this.state.vipLastNameMax > 0 ? this.state.vipLastNameMax : ""}
          />
        </InputRow>
        <InputRow gap={10} titles={['Require Email', 'Require Phone Number']}>
          <Toggle hideLabel />
          <Toggle hideLabel />
        </InputRow>
        <InputRow titles={['Points']}>
          <InputField
            number
            onChange={(value) => this.setState({ vipPointsMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.points}`}
            value={this.state.vipPointsMax > 0 ? this.state.vipPointsMax : ""}
          />
        </InputRow>
      </div>
    )
  }

  staffPanel = () => {
    const { settingsProps } = this.props
    return (
      <div className="settings-content">
        <h2 className="option-title">Staff Management Settings</h2>
        <InputRow titles={['Enable']}>
          <BooleanToggle
            value={this.state.staffEnabled}
            hideLabel
            onChange={(value) => this.setState({ staffEnabled: value })}
          />
        </InputRow>
        <h4 className="option-subtitle">Maximum Character Limits for Staff Management</h4>
        <InputRow gap={10} titles={['Username', 'Password']}>
          <InputField
            number
            onChange={(value) => this.setState({ staffUsernameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.username}`}
            value={this.state.staffUsernameMax > 0 ? this.state.staffUsernameMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ staffPasswordMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.password}`}
            value={this.state.staffPasswordMax > 0 ? this.state.staffPasswordMax : ""}
          />
        </InputRow>
        <InputRow gap={10} titles={['First Name', 'Middle Name', 'Last Name']}>
          <InputField
            number
            onChange={(value) => this.setState({ staffFirstNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.firstName}`}
            value={this.state.staffFirstNameMax > 0 ? this.state.staffFirstNameMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ staffMiddleNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.middleName}`}
            value={this.state.staffMiddleNameMax > 0 ? this.state.staffMiddleNameMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ staffLastNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.lastName}`}
            value={this.state.staffLastNameMax > 0 ? this.state.staffLastNameMax : ""}
          />
        </InputRow>
        <InputRow gap={10} titles={['Address', 'Salary']}>
          <InputField
            number
            onChange={(value) => this.setState({ staffAddressMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.address}`}
            value={this.state.staffAddressMax > 0 ? this.state.staffAddressMax : ""}
          />
          <InputField
            number
            onChange={(value) => this.setState({ staffSalaryMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.salary}`}
            value={this.state.staffSalaryMax > 0 ? this.state.staffSalaryMax : ""}
          />
        </InputRow>
      </div>
    )
  }

  branchPanel = () => {
    const { settingsProps } = this.props
    return (
      <div className="settings-content">
        <h2 className="option-title">Branches Settings</h2>
        <InputRow titles={['Enable']}>
          <BooleanToggle
            value={this.state.branchEnabled}
            hideLabel
            onChange={(value) => this.setState({ branchEnabled: value })}
          />
        </InputRow>
        <h4 className="option-subtitle">Maximum Character Limits for Branches</h4>
        <InputRow gap={10} titles={['Branch Name']}>
          <InputField
            number
            onChange={(value) => this.setState({ branchNameMax: value })}
            placeholder={`Default is ${settingsProps && settingsProps.branchSettings?.inputLength?.branchLocation}`}
            value={this.state.branchNameMax > 0 ? this.state.branchNameMax : ""}
          />
        </InputRow>
      </div>
    )
  }

  renderSettingsContent = () => {
    const { selectedOption } = this.state

    switch (selectedOption) {
      case 'Inventory':
        return this.inventoryPanel()
      case 'Categories':
        return this.categoryPanel()
      case 'Staff Management':
        return this.staffPanel()
      case 'VIP Management':
        return this.vipManagementPanel()
      case 'Branches':
        return this.branchPanel()
      default:
        return null
    }
  }

  render() {
    const { setYesNoSettingsReset, setSettings } = this.state.storeState

    const settingsOptions = [
      { title: 'Inventory' },
      { title: 'Categories' },
      { title: 'Staff Management' },
      { title: 'VIP Management' },
      { title: 'Branches' },
    ]

    return (
      <PanelPage titlePage="Settings" subTitle="Manage your account settings and preferences.">
        <div className="settings-container">
          <aside className="settings-sidebar">
            <nav>
              {settingsOptions.map((option, i) => (
                <button
                  key={i}
                  className={`sidebar-item ${this.state.selectedOption === option.title ? 'active' : ''}`}
                  onClick={() => this.handleSettingsOptionClick(option.title)}
                >
                  {option.title}
                </button>
              ))}
            </nav>
          </aside>
          <div className="settings-main">
            {this.renderSettingsContent()}
            <div className="settings-actions">
              <Button text="Reset to Defaults" cancel onClick={() => setYesNoSettingsReset(true)} />
              <Button text="Apply Changes" error onClick={() => setSettings(this.state)} />
            </div>
          </div>
        </div>
      </PanelPage>
    )
  }
}

export default SettingsPage