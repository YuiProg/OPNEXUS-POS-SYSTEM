import React from "react";
import VipStore from "../../context/VipStore";
import { Modal } from "../../TRModal/Modal";
import ModalStore from "../../context/ModalStore";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import Button from "../../components/TRButton/Button";

const confirmChangesVipModal = () => {
  const { vipChanges } = VipStore.getState();
  const { setShowVipChangesModal } = ModalStore.getState();
  console.log(vipChanges);
  if (!vipChanges) return;
  const { data, oldModel } = vipChanges;
  return (
    <Modal
      onClose={() => setShowVipChangesModal(false)}
      header="Vip Changes"
      subHeader="View your changes"
    >
      <InputRow gap={16}>
        <InputForm noBtn>
          <InputRow
            titles={["First Name", "Middle Name", "Last Name"]}
            gap={16}
          >
            <InputField
              text
              placeholder="First Name"
              value={oldModel.firstName}
              disabled
            />
            <InputField
              text
              placeholder="Middle Name"
              value={oldModel.middleName}
              disabled
            />
            <InputField
              text
              placeholder="Last Name"
              value={oldModel.lastName}
              disabled
            />
          </InputRow>
          <InputRow titles={["Phone Number", "Is Active?", "Points"]} gap={16}>
            <InputField
              text
              placeholder="Phone Number"
              value={oldModel.contactNo}
              disabled
            />
            <InputField
              text
              placeholder="Is Acitve"
              value={oldModel.status}
              disabled
            />
            <InputField
              text
              placeholder="Points"
              value={oldModel.points}
              disabled
            />
          </InputRow>
        </InputForm>
        <InputForm noBtn>
          <InputRow
            titles={["First Name", "Middle Name", "Last Name"]}
            gap={16}
          >
            <InputField
              text
              placeholder="First Name"
              value={data.firstName}
              color={data.firstName !== data.firstName && "#22C55E"}
              disabled
            />
            <InputField
              text
              placeholder="Middle Name"
              value={data.middleName}
              color={data.middleName !== oldModel.middleName && "#22C55E"}
              disabled
            />
            <InputField
              text
              placeholder="Last Name"
              value={data.lastName}
              color={data.lastName !== oldModel.lastName && "#22C55E"}
              disabled
            />
          </InputRow>
          <InputRow titles={["Phone Number", "Is Active?", "Points"]} gap={16}>
            <InputField
              text
              placeholder="Phone Number"
              value={data.contactNo}
              color={data.contactNo !== oldModel.contactNo && "#22C55E"}
              disabled
            />
            <InputField
              text
              placeholder="Is Acitve"
              value={data.status}
              color={data.status !== oldModel.status && "#22C55E"}
              disabled
            />
            <InputField
              text
              placeholder="Points"
              value={data.points}
              color={data.points !== oldModel.points && "#22C55E"}
              disabled
            />
          </InputRow>
        </InputForm>
      </InputRow>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "end",
          justifyContent: "end",
          marginTop: "15px",
        }}
      >
        <Button success text="PROCEED" onClick={() => setShowVipChangesModal(false)} />
      </div>
    </Modal>
  );
};

export default confirmChangesVipModal;
