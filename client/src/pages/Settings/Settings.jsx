import React from "react";
import './Settings.css';
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";
import Toggle from "../../components/TRToggle/Toggle";
import SettingsStore from "../../context/SettingsStore";
import Button from "../../components/TRButton/Button";

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "Inventory",
            settingsState: null
        }
    }

    componentDidMount() {
        this.unsubscribe = SettingsStore.subscribe((state) => {
            console.log(state);
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    handleSettingsOptionClick = (option) => {
        this.setState({ selectedOption: option });
    }

    renderSettingsContent = () => {
        const { selectedOption } = this.state;
        const { setInputs, settings } = SettingsStore.getState();

        switch (selectedOption) {
            case "Inventory":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Inventory Settings</h2>
                    <InputRow titles={["Low Stock Threshold"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("lowStockThreshold", value)}
                            value={settings ? settings.inventorySettings?.lowStockThreshold : 0}
                        />
                    </InputRow>
                    <h4 className="option-subtitle">Maximum Character Limits for Items</h4>
                    <InputRow gap={10} titles={["Product Name", "Quantity", "Price"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("productNameMax", value)}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("quantityMax", value)}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("priceMax", value)}
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
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffPasswordMax", value)}
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["First Name", "Middle Name", "Last Name"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("staffFirstNameMax", value)}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffMiddleNameMax", value)}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffLastNameMax", value)}
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["Address", "Salary"]}>
                        <InputField
                            number
                            onChange={(value) => setInputs("staffAddressMax", value)}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("staffSalaryMax", value)}
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
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("vipMiddleNameMax", value)}
                        />
                        <InputField
                            number
                            onChange={(value) => setInputs("vipLastNameMax", value)}
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
        const { resetSettings, setSettings } = SettingsStore.getState();

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
                            <Button 
                                text="Reset to Defaults"
                                cancel
                                onClick={() => resetSettings()}
                            />
                            <Button 
                                text="Apply Changes"
                                error
                                onClick={() => setSettings()}
                            />
                        </div>
                    </div>
                </div>
            </PanelPage>
        );
    }
}

export default SettingsPage;