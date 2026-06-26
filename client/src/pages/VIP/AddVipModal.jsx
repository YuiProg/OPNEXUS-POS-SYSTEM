import React from 'react'
import { Modal } from '../../TRModal/Modal'
import ModalStore from '../../context/ModalStore'
import { InputForm, InputRow } from '../../components/TRInputForm/TRInputForm'
import InputField from '../../components/TRInputField/InputFIeld'
import VipStore from '../../context/VipStore'

const addVipUser = (settings) => {
  const { setShowVipModal } = ModalStore.getState()
  const { addVip, setInputs } = VipStore.getState()

  const handleSubmit = (e) => {
    e.preventDefault()
    addVip()
  }
  const { vipManagementSettings } = settings.data
  console.log(vipManagementSettings)
  return (
    <Modal
      onClose={() => setShowVipModal(false)}
      header="Add vip"
      subHeader="Add new vip for discounts etc."
      hasCancel
      onCancel={() => setShowVipModal(false)}
    >
      <InputForm onSubmit={(e) => handleSubmit(e)}>
        <InputRow titles={['VIP ID']} gap={15}>
          {vipManagementSettings.vipIdInputField && (
            <InputField
              text
              placeholder="Enter VIP ID (Optional)"
              onChange={(value) => setInputs('_id', value)}
              maxLength={5}
            />
          )}
        </InputRow>
        <InputRow gap={15} titles={['First Name', 'Middle Name', 'Last Name']}>
          <InputField
            text
            placeholder="Enter First Name"
            onChange={(value) => setInputs('firstName', value)}
            required
            maxLength={vipManagementSettings.inputLength.firstName}
          />
          <InputField
            text
            placeholder="Enter Middle Name"
            onChange={(value) => setInputs('middleName', value)}
            maxLength={vipManagementSettings.inputLength.middleName}
          />
          <InputField
            text
            placeholder="Enter Last Name"
            onChange={(value) => setInputs('lastName', value)}
            maxLength={vipManagementSettings.inputLength.lastName}
            required
          />
        </InputRow>
        <InputRow titles={['Email', 'Contact No.', 'Points']} gap={15}>
          <InputField
            email
            placeholder="Enter Email"
            onChange={(value) => setInputs('email', value.toLowerCase())}
            required={vipManagementSettings.inputLength.emailRequired}
          />
          <InputField
            number
            placeholder="(+63)"
            maxLength={10}
            onChange={(value) => setInputs('contactNo', Number(value))}
            required={vipManagementSettings.inputLength.contactNoRequired}
          />
          <InputField
            number
            placeholder="Default is 0"
            onChange={(value) => setInputs('points', Number(value))}
            maxLength={vipManagementSettings.inputLength.points}
          />
        </InputRow>
      </InputForm>
    </Modal>
  )
}

export default addVipUser
