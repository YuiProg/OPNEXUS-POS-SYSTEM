import React from "react";
import "./Inventory.css";
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchValue: ''
    }
  }

  checkRole = () => {
    const { user } = this.props;

    console.log(user);
  }

  componentDidMount() {
    this.checkRole();
  }

  handleTableSearch = (value) =>{
    this.setState({searchValue: value});
  }

  render() {

    const dummyData = [
                    { productid: 4821, name: "Vape Ultra",   category: "Device",      quantity: 143 },
                    { productid: 1093, name: "Cloud Nine",   category: "Cartridge",   quantity: 57  },
                    { productid: 7364, name: "Ice Formula",  category: "Juice",       quantity: 12  },
                    { productid: 2857, name: "Frost Bite",   category: "Pod",         quantity: 88  },
                    { productid: 9142, name: "Mango Blast",  category: "Accessory",   quantity: 200 },
                    { productid: 3376, name: "Berry Rush",   category: "Juice",       quantity: 34  },
                    { productid: 6619, name: "Mint Strike",  category: "Device",      quantity: 71  },
                    { productid: 5083, name: "Citrus Drop",  category: "Cartridge",   quantity: 159 },
                    { productid: 8247, name: "Blue Razz",    category: "Pod",         quantity: 6   },
                    { productid: 1734, name: "Grape Storm",  category: "Accessory",   quantity: 95  },
                    { productid: 4409, name: "Lychee Mist",  category: "Juice",       quantity: 48  },
                    { productid: 7821, name: "Peach Wave",   category: "Device",      quantity: 113 },
                    { productid: 2263, name: "Watermelon X", category: "Cartridge",   quantity: 77  },
                    { productid: 9958, name: "Strawberry OG",category: "Pod",         quantity: 22  },
                    { productid: 3541, name: "Melon Chill",  category: "Accessory",   quantity: 167 },
                    { productid: 6102, name: "Tropical Hit", category: "Juice",       quantity: 39  },
                    { productid: 8834, name: "Arctic Blast", category: "Device",      quantity: 84  },
                    { productid: 4821, name: "Vape Ultra",   category: "Device",      quantity: 143 },
                    { productid: 1093, name: "Cloud Nine",   category: "Cartridge",   quantity: 57  },
                    { productid: 7364, name: "Ice Formula",  category: "Juice",       quantity: 12  },
                    { productid: 2857, name: "Frost Bite",   category: "Pod",         quantity: 88  },
                    { productid: 9142, name: "Mango Blast",  category: "Accessory",   quantity: 200 },
                    { productid: 3376, name: "Berry Rush",   category: "Juice",       quantity: 34  },
                    { productid: 6619, name: "Mint Strike",  category: "Device",      quantity: 71  },
                    { productid: 5083, name: "Citrus Drop",  category: "Cartridge",   quantity: 159 },
                    { productid: 8247, name: "Blue Razz",    category: "Pod",         quantity: 6   },
                    { productid: 1734, name: "Grape Storm",  category: "Accessory",   quantity: 95  },
                    { productid: 4409, name: "Lychee Mist",  category: "Juice",       quantity: 48  },
                    { productid: 7821, name: "Peach Wave",   category: "Device",      quantity: 113 },
                    { productid: 2263, name: "Watermelon X", category: "Cartridge",   quantity: 77  },
                    { productid: 9958, name: "Strawberry OG",category: "Pod",         quantity: 22  },
                    { productid: 3541, name: "Melon Chill",  category: "Accessory",   quantity: 167 },
                    { productid: 6102, name: "Tropical Hit", category: "Juice",       quantity: 39  },
                    { productid: 8834, name: "Arctic Blast", category: "Device",      quantity: 84  },
                    { productid: 1477, name: "Kiwi Surge",   category: "Cartridge",   quantity: 131 },
                    { productid: 5290, name: "Cherry Bomb",  category: "Pod",         quantity: 19  },
                    { productid: 7063, name: "Coconut Drift",category: "Accessory",   quantity: 102 },
                    { productid: 4821, name: "Vape Ultra",   category: "Device",      quantity: 143 },
                    { productid: 1093, name: "Cloud Nine",   category: "Cartridge",   quantity: 57  },
                    { productid: 7364, name: "Ice Formula",  category: "Juice",       quantity: 12  },
                    { productid: 2857, name: "Frost Bite",   category: "Pod",         quantity: 88  },
                    { productid: 9142, name: "Mango Blast",  category: "Accessory",   quantity: 200 },
                    { productid: 3376, name: "Berry Rush",   category: "Juice",       quantity: 34  },
                    { productid: 6619, name: "Mint Strike",  category: "Device",      quantity: 71  },
                    { productid: 5083, name: "Citrus Drop",  category: "Cartridge",   quantity: 159 },
                    { productid: 8247, name: "Blue Razz",    category: "Pod",         quantity: 6   },
                    { productid: 1734, name: "Grape Storm",  category: "Accessory",   quantity: 95  },
                    { productid: 4409, name: "Lychee Mist",  category: "Juice",       quantity: 48  },
                    { productid: 7821, name: "Peach Wave",   category: "Device",      quantity: 113 },
                    { productid: 2263, name: "Watermelon X", category: "Cartridge",   quantity: 77  },
                    { productid: 9958, name: "Strawberry OG",category: "Pod",         quantity: 22  },
                    { productid: 3541, name: "Melon Chill",  category: "Accessory",   quantity: 167 },
                    { productid: 6102, name: "Tropical Hit", category: "Juice",       quantity: 39  },
                    { productid: 8834, name: "Arctic Blast", category: "Device",      quantity: 84  },
                    { productid: 1477, name: "Kiwi Surge",   category: "Cartridge",   quantity: 131 },
                    { productid: 5290, name: "Cherry Bomb",  category: "Pod",         quantity: 19  },
                    { productid: 7063, name: "Coconut Drift",category: "Accessory",   quantity: 102 },
                    { productid: 4821, name: "Vape Ultra",   category: "Device",      quantity: 143 },
                    { productid: 1093, name: "Cloud Nine",   category: "Cartridge",   quantity: 57  },
                    { productid: 7364, name: "Ice Formula",  category: "Juice",       quantity: 12  },
                    { productid: 2857, name: "Frost Bite",   category: "Pod",         quantity: 88  },
                    { productid: 9142, name: "Mango Blast",  category: "Accessory",   quantity: 200 },
                    { productid: 3376, name: "Berry Rush",   category: "Juice",       quantity: 34  },
                    { productid: 6619, name: "Mint Strike",  category: "Device",      quantity: 71  },
                    { productid: 5083, name: "Citrus Drop",  category: "Cartridge",   quantity: 159 },
                    { productid: 8247, name: "Blue Razz",    category: "Pod",         quantity: 6   },
                    { productid: 1734, name: "Grape Storm",  category: "Accessory",   quantity: 95  },
                    { productid: 4409, name: "Lychee Mist",  category: "Juice",       quantity: 48  },
                    { productid: 7821, name: "Peach Wave",   category: "Device",      quantity: 113 },
                    { productid: 2263, name: "Watermelon X", category: "Cartridge",   quantity: 77  },
                    { productid: 9958, name: "Strawberry OG",category: "Pod",         quantity: 22  },
                    { productid: 3541, name: "Melon Chill",  category: "Accessory",   quantity: 167 },
                    { productid: 6102, name: "Tropical Hit", category: "Juice",       quantity: 39  },
                    { productid: 8834, name: "Arctic Blast", category: "Device",      quantity: 84  },
                    { productid: 1477, name: "Kiwi Surge",   category: "Cartridge",   quantity: 131 },
                ];

    const tableData = {
      header: "ITEMS TEST",
      hasButton: true,
      CB: () => {},
      buttonInfo: "NEW ITEM",
      search: (
        <InputField
          placeholder="Search item"
          isSearch
          onEnterDown={value => this.handleTableSearch(value)}
        />
      ),
    };

    return (
      <div className="inventory-container">
        <div className="top-contents">
            <h1 className="bigtitle">Hello, What do you want to do today?</h1>
            <div className="branch-dropdown">
              <p className="branch-text">Branch</p>
              <DropDown className="branch-dd"/>
            </div>
        </div>
        <div>
            <Table
                data={dummyData}
                isDetailed={tableData}
                hasAction
                hasSelect
                onDelete={() => {}}
                onEdit={() => {}}
                search={this.state.searchValue}
            />
        </div>
        
      </div>
    );
  }
}

export default Inventory;
