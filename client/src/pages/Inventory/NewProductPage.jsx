import React from 'react'
import { PanelContainer, PanelPage } from '../../components/TRPanelPage/TRPanelPage'
import { InputForm, InputRow } from '../../components/TRInputForm/TRInputForm'
import InputField from '../../components/TRInputField/InputFIeld'
import DropdownPortal from '../../components/TRDropDown/Dropdown'
import TRAddfile from '../../components/TRAddFile/TRAddFile'
import BranchStore from '../../context/BranchStore'
import CategoryStore from '../../context/CategoryStore'
import ProductStore from '../../context/ProductStore'
import Button from '../../components/TRButton/Button'
import AuthStore from '../../context/Authstore'
import ModalStore from '../../context/ModalStore'

const { getBranch } = BranchStore.getState()
const { getCategories } = CategoryStore.getState()
const { setProductInput, validateProduct, setStep, addNewProduct, resetInput } = ProductStore.getState();

class NewProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      branches: null,
      categories: null,
      step: 1,
      validateData: null,
      confirmReturnedData: null
    }
  }

  componentDidMount() {
    getBranch()
    getCategories()
    setStep(1);
    resetInput();

    this.unsubscribeBranches = BranchStore.subscribe((state) => {
      this.setState({ branches: state.branches })
    })

    this.unsubscribeCategories = CategoryStore.subscribe((state) => {
      this.setState({ categories: state.categories })
    })

    this.unsubscribeStep = ProductStore.subscribe((state) => {
      this.setState({step: state.step});
    });
  }


  clickNext = async () => {
    const {AuthUser} = AuthStore.getState();

    switch (this.state.step) {
      case 1: {
        const validate = await validateProduct();
        this.setState({ validateData: { ...validate.data.data, creatorName: AuthUser.username } });
        if (validate.status !== 'Missing fields!') {
          setStep(2);
        }
        break;
      }
      case 2: {
        await addNewProduct(true, this.state.validateData);
        setStep(3);
        break;
      }
      case 3: {
        this.props.navigate('/inventory');
        break;
      }
    }
  }

  clickBack = () => {
    setStep(this.state.step - 1);
    if (this.state.step === 1) {
      this.props.navigate('/inventory');
    }
  }

  componentWillUnmount() {
    this.unsubscribeBranches();
    this.unsubscribeCategories();
    this.unsubscribeStep();
  }

  productInfo = () => {
    return (
      <InputRow gap={16} titles={['Product Name', 'Quantity', 'Price']} bottomMargin>
        <InputField
          text
          placeholder="Enter Product Name"
          onChange={(e) => setProductInput('productName', e)}
          required
        />
        <InputField
          text
          placeholder="Enter Product Quantity"
          onChange={(e) => setProductInput('quantity', Number(e))}
        />
        <InputField
          number
          placeholder="Enter Product Price"
          onChange={(e) => setProductInput('price', Number(e))}
          required
        />
      </InputRow>
    )
  }

  productDropDown = () => {
    const { setShowNewCategoryModal } = ModalStore.getState();
    return (
      <>
        <InputRow gap={16} titles={['Category', 'Add Category']} bottomMargin>
          <DropdownPortal
            defaultValue="Category"
            options={this.state.categories?.map((d) => d.categoryName)}
            onChange={(e) => setProductInput('category', e)}  
          />
          <Button maxWidth cancel text='Add Category' onClick={() => setShowNewCategoryModal(true)}/>
        </InputRow>
        <InputRow gap={16} titles={['Branch']} bottomMargin>
          <DropdownPortal
            options={this.state.branches?.map((d) => d.location)}
            onChange={(e) => setProductInput('productBranch', e)}
          />
        </InputRow>
      </>
    )
  }

  productImage = () => {
    return (
      <InputRow titles={['Add product image']}>
        <TRAddfile onChange={(e) => setProductInput('image', e)}/>
      </InputRow>
    )
  }

  currentStep = () => {
    const { step } = this.state;
    switch (step) {
      case 1:
        return (
          <>
            {this.productInfo()}
            {this.productDropDown()}
            {this.productImage()}
          </>
        )
      case 2:
        return (
          this.confirmPanel()
        )
      case 3:
        return (
          this.ackPage()
        )
    }
  }

  confirmPanel = () => {
    return (
      <>
        <div style={{marginBottom: '10px'}}>
          <h1>Confirm Details</h1>
        </div>
        <InputRow titles={['Product Name', 'Quantity']} gap={16} bottomMargin>
          <InputField text value={this.state.validateData.productName} placeholder="Product Name" disabled/>
          <InputField text value={String(this.state.validateData.quantity)} placeholder="Quantity" disabled/>
        </InputRow>
        <InputRow titles={['Category', 'Branch']} gap={16 } bottomMargin>
          <InputField text value={this.state.validateData.category} placeholder="Category" disabled/>
          <InputField text value={String(this.state.validateData.productBranch)} placeholder="Branch" disabled/>
        </InputRow>
        {this.state.validateData.image && (
          <InputRow titles={['Product Image']}>
            <TRAddfile image={this.state.validateData.image} disabled/>
          </InputRow>
        )}
      </>
    );
  }

  ackPage = () => {
    return (
       <>
        <div style={{marginBottom: '10px'}}>
          <h1>New product successfully added!</h1>
        </div>
        <InputRow titles={['Product Name', 'Quantity']} gap={16} bottomMargin>
          <InputField text value={this.state.validateData.productName} placeholder="Product Name" disabled/>
          <InputField text value={String(this.state.validateData.quantity)} placeholder="Quantity" disabled/>
        </InputRow>
        <InputRow titles={['Category', 'Branch']} gap={16 } bottomMargin>
          <InputField text value={this.state.validateData.category} placeholder="Category" disabled/>
          <InputField text value={String(this.state.validateData.productBranch)} placeholder="Branch" disabled/>
        </InputRow>
        {this.state.validateData.image && (
          <InputRow titles={['Product Image']}>
            <TRAddfile image={this.state.validateData.image} disabled/>
          </InputRow>
        )}
      </>
    );
  }

  render() {
    return (
      <PanelPage 
        titlePage="ADD PRODUCTS" 
        subTitle="Add new products here" 
        hasStepper 
        onClickNext={() => this.clickNext()} 
        onClickBack={() => this.clickBack()}
      >
        <PanelContainer currentStep={this.state.step} totalSteps={3}>
          {this.currentStep()}
        </PanelContainer>
      </PanelPage>
    )
  }
}

export default NewProductPage
