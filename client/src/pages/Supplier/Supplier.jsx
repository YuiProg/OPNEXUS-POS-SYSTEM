import React from "react";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";
import AuthStore from "../../context/Authstore";
import BranchStore from "../../context/BranchStore";
import { Table } from "../../components/TRTable/TrTable";

class Supplier extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {setSelectedBranch, selectedBranch} = AuthStore.getState();
        const { branches } = BranchStore.getState();

        const branchNames = branches.map(d=>d.location);

        const tableSettings = {
            header: 'Supplier Details',
            hasButton: true,
            CB: () => console.log('test'),
            buttonInfo: 'ADD SUPPLIER'
        };

        const sampleData = [
            {
                Id:          'SUP-324WED',
                Name:        'Juan Dela Cruz Trading',
                Contact:     '09171234567',
                Email:       'juan@trading.com',
                Category:    'Beverages',
                Items:       23,
                Branch:      'longos',
                Status:      'ACTIVE',
            },
            {
                Id:          'SUP-21222DD',
                Name:        'Maria Santos Supplies',
                Contact:     '09289876543',
                Email:       'maria@supplies.com',
                Category:    'Snacks',
                Items:       45,
                Branch:      'branch3',
                Status:      'PENDING',
            },
            {
                Id:          'SUP-99XZ11A',
                Name:        'Pedro Reyes Wholesale',
                Contact:     '09351122334',
                Email:       'pedro@wholesale.com',
                Category:    'Dairy',
                Items:       12,
                Branch:      'updated',
                Status:      'INACTIVE',
            },
        ];

        return (
            <PanelPage 
                user={this.props.user}
                titlePage="Supplier Management"
                subTitle="Manage your suppliers" 
                hasBranch={true}
                branchNames={branchNames} 
                dropDownFunc={(e) => setSelectedBranch(e)}
                selectedBranch={selectedBranch}
            >
                <Table 
                    isDetailed={tableSettings} 
                    data={sampleData} 
                    hasAction 
                    hasSelect
                />
            </PanelPage>
        );
    }
}

export default Supplier;