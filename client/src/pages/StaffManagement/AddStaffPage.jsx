import React from 'react'
import { PanelContainer, PanelPage } from '../../components/TRPanelPage/TRPanelPage'
import { InputRow } from '../../components/TRInputForm/TRInputForm'
import AuthStore from '../../context/Authstore'
import InputField from '../../components/TRInputField/InputFIeld'
import { BooleanToggle } from '../../components/TRToggle/Toggle'
import DropdownPortal from '../../components/TRDropDown/Dropdown'

const { setStep, setInput, resetInput, validateDataFunc, addUser } = AuthStore.getState()

class AddStaffPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      validateDate: null,
      input: AuthStore.getState().input,
    }
  }

  componentDidMount() {
    setStep(1)
    this.unsubscribeAuth = AuthStore.subscribe((state) => {
      this.setState({ 
        step: state.steps,
        input: state.input,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
  }

  addStaff = (isView) => {
    const inputLength = this.props.settings.staffManagementSettings.inputLength
    const { input } = this.state;
    console.log(input);
    return (
      <>
        <div style={{marginBottom: '10px'}}>
          <h1>{this.state.step === 1 ? 'Add Staff' : this.state.step === 2 ? 'Confirm Details' : 'Staff Added'}</h1>
        </div>
        <InputRow gap={16} titles={['Username', 'Email', 'Password']} bottomMargin>
          <InputField
            text
            onChange={(e) => setInput('username', e)}
            value={input.username}
            placeholder="Username"
            required
            disabled={isView}
            maxLength={inputLength.username}
          />
          <InputField
            email            
            onChange={(e) => setInput('email', e)}
            value={input.email}
            placeholder="Email"
            required
            disabled={isView}
          />
          <InputField
            password
            onChange={(e) => setInput('password', e)}
            value={input.password}
            placeholder="Password"
            type="password"
            required
            disabled={isView}
            maxLength={inputLength.password}
          />
        </InputRow>
        <InputRow gap={16} titles={['First Name', 'Middle Name', 'Last Name']} bottomMargin>
          <InputField
            text
            onChange={(e) => setInput('firstName', e)}
            value={input.firstName}
            placeholder="First Name"
            required
            disabled={isView}
            maxLength={inputLength.firstName}
          />
          <InputField
            text
            onChange={(e) => setInput('middleName', e)}
            value={input.middleName}
            placeholder="Middle Name"
            disabled={isView}
            maxLength={inputLength.middleName}
          />
          <InputField
            text
            onChange={(e) => setInput('lastName', e)}
            value={input.lastName}
            placeholder="Last Name"
            required
            disabled={isView}
            maxLength={inputLength.lastName}
          />
        </InputRow>
        <InputRow gap={16} titles={['Address', 'Contact Number', 'Salary']} bottomMargin>
          <InputField
            text
            onChange={(e) => setInput('address', e)}
            value={input.address}
            placeholder="Address"
            required
            disabled={isView}
            maxLength={inputLength.address}
          />
          <InputField
            number
            onChange={(e) => setInput('phoneNumber', Number(e))}
            value={input.phoneNumber}
            placeholder="Contact Number"
            required
            disabled={isView}
          />
          <InputField
            number
            onChange={(e) => setInput('salary', Number(e))}
            value={input.salary}
            placeholder="Salary"
            required
            disabled={isView}
            maxLength={inputLength.salary}
          />
        </InputRow>
        <InputRow gap={16} titles={['Role', 'Shift', 'Gender']} bottomMargin>
          <DropdownPortal
            defaultValue="Role"
            options={['Admin', 'Clerk']}
            onChange={(e) => setInput('role', e)}
            disabled={isView}
          />
          <DropdownPortal
            defaultValue="Shift"
            options={['Day', 'Night']}
            onChange={(e) => setInput('shift', e)}
            disabled={isView}
          />
          <DropdownPortal
            defaultValue="Gender"
            options={['Male', 'Female']}
            onChange={(e) => setInput('gender', e)}
            disabled={isView}
          />
        </InputRow>
        <InputRow titles={['Send Email Notification']} bottomMargin>
          {!isView ? (
            <BooleanToggle 
              value={input.sendEmail ?? false}
              hideLabel 
              onChange={(val) => setInput('sendEmail', val)} 
            />
          ) : (
            <p>{input.sendEmail ? 'Yes' : 'No'}</p>
          )}
        </InputRow>
      </>
    )
  }

  currentStep = () => {
    switch (this.state.step) {
      case 1:
        return this.addStaff(false);
      case 2:
        return this.addStaff(true);
      case 3:
        return this.addStaff(true);
      default:
        return this.addStaff(false)
    }
  }

  clickNext = async () => {
    switch (this.state.step) {
      case 1: {
        const validate = await validateDataFunc();
        if (validate) {
          this.setState({ validateDate: validate.data });
          setStep(2);
        }
        break;
      }
      case 2:
        await addUser();
        setStep(3);
        break;
      case 3: 
        resetInput();
        this.setState({ validateDate: null });
        this.props.navigate('/staff');
        break;
    }
  }

  clickBack = () => {
    if (this.state.step === 1) {
      this.props.navigate('/staff');
    }
    setStep(this.state.step - 1);
  }

  render() {

    return (
      <PanelPage 
        titlePage="Add Staff" 
        subTitle="Add newly hired staff or admins here." 
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

export default AddStaffPage