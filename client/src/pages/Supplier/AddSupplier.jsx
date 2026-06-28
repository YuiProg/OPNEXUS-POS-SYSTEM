import React from "react";
import { PanelContainer, PanelPage } from "../../components/TRPanelPage/TRPanelPage";

class AddSuppler extends React.Component {
    constructor (props) {
        super(props);
    }

    addStep = () => {
        return (
            <>
            </>
        );
    }

    currentStep = () => {
        
    }

    render () {
        return (
            <PanelPage 
                titlePage="ADD SUPPLIERS" 
                subTitle="Add or Delete Suppliers"
                hasStepper
            >
                <PanelContainer currentStep={1} totalSteps={3}>

                </PanelContainer>
            </PanelPage>
        );
    }
}

export default AddSuppler;