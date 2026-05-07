import React from "react";
import './Settings.css';
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";
import Toggle from "../../components/TRToggle/Toggle";

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

        switch (selectedOption) {
            case "Inventory":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Inventory Settings</h2>
                    <InputRow titles={["Low Stock Threshold"]}>
                        <InputField
                            number
                        />
                    </InputRow>
                    <h4>Maximum Character Limits for Items</h4>
                    <InputRow gap={10} titles={["Product Name", "Quantity", "Price"]}>
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                    </InputRow>
                </div>
                );
            case "Categories":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Categories Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle />
                    </InputRow>
                    <h4>Maximum Character Limits for Categories</h4>
                    <InputRow gap={10} titles={["Category Name"]}>
                        <InputField
                            number
                        />
                    </InputRow>
                </div>
                );
            case "Staff Management":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Staff Management Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle />
                    </InputRow>
                    <h4>Maximum Character Limits for Staff Management</h4>
                    <InputRow gap={10} titles={["Username", "Password"]}>
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["First Name", "Middle Name", "Last Name"]}>
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["Address", "Salary"]}>
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                    </InputRow>
                </div>
                );
            case "VIP Management":
                return (
                <div className="settings-content">
                    <h2 className="option-title">VIP Management Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle />
                    </InputRow>
                    <InputRow titles={["Enable VIP ID Input Field"]}>
                        <Toggle />
                    </InputRow>
                    <h4>Maximum Character Limits for VIP Management</h4>
                    <InputRow gap={10} titles={["First Name", "Middle Name", "Last Name"]}>
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                        <InputField
                            number
                        />
                    </InputRow>
                    <InputRow gap={10} titles={["Require Email", "Require Phone Number"]}>
                        <Toggle />
                        <Toggle />
                    </InputRow>
                    <InputRow titles={["Points"]}>
                        <InputField
                            number
                        />
                    </InputRow>
                </div>
                );
            case "Branches":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Branches Settings</h2>
                    <InputRow titles={["Enable"]}>
                        <Toggle />
                    </InputRow>
                    <h4>Maximum Character Limits for Branches</h4>
                    <InputRow gap={10} titles={["Branch Name"]}>
                        <InputField
                            number
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
        ]
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
                    <main className="settings-main">
                        {this.renderSettingsContent()}
                    </main>
                </div>
            </PanelPage>
        );
    }
}

export default SettingsPage;