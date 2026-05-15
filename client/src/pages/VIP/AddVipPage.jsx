import React from "react";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";

class AddVipPage extends React.Component {
    render () {
        return (
            <PanelPage 
                user={this.props.user} 
                titlePage="ADD VIP" 
                subTitle="Add new vips here."
            >

            </PanelPage>
        );
    }
}

export default AddVipPage;