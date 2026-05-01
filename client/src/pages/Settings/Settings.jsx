import React from "react";
import './Settings.css';
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="st-container">
                <div className="st-top-contents">
                    <div className="st-header">
                        <h1 className="st-bigtitle">Settings</h1>
                        <p className="st-sentence">
                            Manage your settings and preferences.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;