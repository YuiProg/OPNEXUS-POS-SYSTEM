import React from 'react'
import { PanelContainer, PanelPage } from '../../components/TRPanelPage/TRPanelPage'
import { InputRow } from '../../components/TRInputForm/TRInputForm'
import AuthStore from '../../context/Authstore'
import InputField from '../../components/TRInputField/InputFIeld'
import { Toggle, BooleanToggle } from '../../components/TRToggle/Toggle'
import DropdownPortal from '../../components/TRDropDown/Dropdown'

const { setStep, setInput, input, validateDataFunc } = AuthStore.getState()

class AddStaffPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1
    }
  }

  componentDidMount() {
    setStep(1)
    this.unsubscribe = AuthStore.subscribe((state) => {
      this.setState({ step: state.steps })
    })
  }

  addStaff = (isView) => {
    return (
      <>
        <InputRow gap={16} titles={['Username', 'Email', 'Password']} bottomMargin>
          <InputField
            text
            onChange={(e) => setInput('username', e)}
            value={input.username}
            placeholder="Username"
            required
            disabled={isView}
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
          />
          <InputField
            text
            onChange={(e) => setInput('middleName', e)}
            value={input.middleName}
            placeholder="Middle Name"
            disabled={isView}
          />
          <InputField
            text
            onChange={(e) => setInput('lastName', e)}
            value={input.lastName}
            placeholder="Last Name"
            required
            disabled={isView}
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
          />
        </InputRow>
        <InputRow gap={16} titles={['Role', 'Shift', 'Gender']} bottomMargin>
          <DropdownPortal
            defaultValue="Role"
            options={['Admin', 'Clerk']}
            onChange={(e) => setInput('role', e)}
          />
          <DropdownPortal
            defaultValue="Shift"
            options={['Day', 'Night']}
            onChange={(e) => setInput('shift', e)}
          />
          <DropdownPortal
            defaultValue="Gender"
            options={['Male', 'Female']}
            onChange={(e) => setInput('gender', e)}
          />
        </InputRow>
        <InputRow titles={['Send Email Notification']} bottomMargin>
          {!isView ? (
            <BooleanToggle defaultValue={false} hideLabel onChange={(val) => setInput('sendEmail', val)} />
          ) : (
            <p>YES</p>
          )}
        </InputRow>
      </>
    )
  }

  currentStep = () => {
    switch (this.state.step) {
      case 1:
        return this.addStaff(false)
      case 2:
        return this.addStaff(true)
      default:
        return this.addStaff(false)
    }
  }

  onClickNext = () => {
    validateDataFunc();
  }

  render() {
    return (
      <PanelPage 
        titlePage="Add Staff" 
        subTitle="Add newly hired staff or admins here." 
        hasStepper
        onClickNext={() => this.onClickNext()}
      >
        <PanelContainer currentStep={this.state.step} totalSteps={3}>
          {this.currentStep()}
        </PanelContainer>
      </PanelPage>
    )
  }
}

export default AddStaffPage
