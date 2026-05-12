import React from "react";
import './Settings.css';
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";
import Toggle from "../../components/TRToggle/Toggle";
import SettingsStore from "../../context/SettingsStore";
import Button from "../../components/TRButton/Button";
import { ModalYesNo } from "../../TRModal/Modal"

const { 
    yesNoSettingsApply,
    setYesNoSettingsApply,
    setYesNoSettingsReset,
    setInputs, 
    inputs 
} = SettingsStore.getState();

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "Inventory"
        }
    }

    handleSettingsOptionClick = (option) => {
        this.setState({ selectedOption: option });
    }

    renderSettingsContent = () => {
        const { selectedOption } = this.state;
        const { settingsProps } = this.props;
        switch (selectedOption) {
            case "Inventory":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Inventory Settings</h2>
                    <InputRow titles={["Low Stock Threshold"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("lowStockThreshold", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.lowStockThreshold}`}
                            value={inputs.lowStockThreshold > 0 ? inputs.lowStockThreshold : ""}
                        />
                    </InputRow>
                    <h4 className="option-subtitle">Maximum Character Limits for Items</h4>
                    <InputRow gap={10} titles={["Product Name", "Quantity", "Price"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("productNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.inputLength.productName}`}
                            value={inputs.productNameMax > 0 ? inputs.productNameMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("quantityMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.inputLength.quantity}`}
                            value={inputs.quantityMax > 0 ? inputs.quantityMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("priceMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.inventorySettings?.inputLength.price}`}
                            value={inputs.priceMax > 0 ? inputs.priceMax : ""}
                        />
                    </InputRow>
                </div>
                );
            case "Categories":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Categories Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle hideLabel/>
                    </InputRow>
                    <h4 className="option-subtitle">Maximum Character Limits for Categories</h4>
                    <InputRow gap={10} titles={["Category Name"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("categoryNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.categorySettings?.inputLength.categoryName}`}
                            value={inputs.categoryNameMax > 0 ? inputs.categoryNameMax : ""}
                        />
                    </InputRow>
                </div>
                );
            case "Staff Management":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Staff Management Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle hideLabel/>
                    </InputRow>
                    <h4 className="option-subtitle">Maximum Character Limits for Staff Management</h4>
                    <InputRow gap={10} titles={["Username", "Password"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("staffUsernameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.username}`}
                            value={inputs.staffUsernameMax > 0 ? inputs.staffUsernameMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffPasswordMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.password}`}
                            value={inputs.staffPasswordMax > 0 ? inputs.staffPasswordMax : ""}
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["First Name", "Middle Name", "Last Name"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("staffFirstNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.firstName}`}
                            value={inputs.staffFirstNameMax > 0 ? inputs.staffFirstNameMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffMiddleNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.middleName}`}
                            value={inputs.staffMiddleNameMax > 0 ? inputs.staffMiddleNameMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffLastNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.lastName}`}
                            value={inputs.staffLastNameMax > 0 ? inputs.staffLastNameMax : ""}
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["Address", "Salary"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("staffAddressMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.address}`}
                            value={inputs.staffAddressMax > 0 ? inputs.staffAddressMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffSalaryMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.staffManagementSettings?.inputLength.salary}`}
                            value={inputs.staffSalaryMax > 0 ? inputs.staffSalaryMax : ""}
                        />
                    </InputRow>
                </div>
                );
            case "VIP Management":
                return (
                <div className="settings-content">
                    <h2 className="option-title">VIP Management Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle hideLabel/>
                    </InputRow>
                    <InputRow titles={["Enable VIP ID Input Field"]}>
                        <Toggle hideLabel/>
                    </InputRow>
                    <h4 className="option-subtitle">Maximum Character Limits for VIP Management</h4>
                    <InputRow gap={10} titles={["First Name", "Middle Name", "Last Name"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("vipFirstNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.firstName}`}
                            value={inputs.vipFirstNameMax > 0 ? inputs.vipFirstNameMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("vipMiddleNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.middleName}`}
                            value={inputs.vipMiddleNameMax > 0 ? inputs.vipMiddleNameMax : ""}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("vipLastNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.lastName}`}
                            value={inputs.vipLastNameMax > 0 ? inputs.vipLastNameMax : ""}
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["Require Email", "Require Phone Number"]}>
                        <Toggle hideLabel/>
                        <Toggle hideLabel/>
                    </InputRow>
                    <InputRow titles={["Points"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("vipPointsMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.vipManagementSettings?.inputLength.points}`}
                            value={inputs.vipPointsMax > 0 ? inputs.vipPointsMax : ""}
                        />
                    </InputRow>
                </div>
                );
            case "Branches":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Branches Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle hideLabel/>
                    </InputRow>
                    <h4 className="option-subtitle">Maximum Character Limits for Branches</h4>
                    <InputRow gap={10} titles={["Branch Name"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("branchNameMax", value)}
                            placeholder={`Default is ${settingsProps && settingsProps.branchSettings?.inputLength?.branchLocation}`}
                            value={inputs.branchNameMax > 0 ? inputs.branchNameMax : ""}
                        />
                    </InputRow>
                </div>
                );
            default:
                return null;
        }
    }

    render () {
        const settingsOptions = [
            {
                title: "Inventory"
            },
            {
                title: "Categories"
            },
            {
                title: "Staff Management"
            },
            {
                title: "VIP Management"
            },
            {
                title: "Branches"
            }
        ];

        return (
            <PanelPage 
                titlePage="Settings" 
                subTitle="Manage your account settings and preferences."
            >
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
                            {yesNoSettingsApply && this.yesNoSettingsModal()}
                            <Button 
                                text="Reset to Defaults"
                                cancel
                                onClick={() => setYesNoSettingsReset(true)}
                            />
                            <Button 
                                text="Apply Changes"
                                error
                                onClick={() => setYesNoSettingsApply(true)}
                            />
                        </div>
                    </div>
                </div>
            </PanelPage>
        );
    }
}

export default SettingsPage;