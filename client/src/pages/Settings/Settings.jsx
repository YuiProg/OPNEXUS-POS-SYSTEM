import React from "react";
import './Settings.css';
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";

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
                </div>
                );
            case "Categories":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Categories Settings</h2>
                </div>
                );
            case "Staff Management":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Staff Management Settings</h2>
                </div>
                );
            case "VIP Management":
                return (
                <div className="settings-content">
                    <h2 className="option-title">VIP Management Settings</h2>
                </div>
                );
            case "Branches":
                return (
                <div className="settings-content">
                    <h2 className="option-title">Branches Settings</h2>
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