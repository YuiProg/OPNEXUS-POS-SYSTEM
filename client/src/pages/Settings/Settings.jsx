import React from "react";
import './Settings.css';
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
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
                {/* dito nalang kaya natin ilagay yung "Change password" ng admin accounts */}
                <div className="settings-options">
                    {settingsOptions.map((option, index) => (
                        <div key={index} className="setting-option">
                            <h3>{option.title}</h3>
                        </div>
                    ))}
                </div>
            </PanelPage>
        );
    }
}

export default SettingsPage;