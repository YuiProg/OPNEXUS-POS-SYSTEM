import React from 'react'
import SettingsStore from '../../context/SettingsStore';
import { ModalYesNo } from '../../TRModal/Modal';

export const yesNoSettingsApplyModal = () => {
  const { setYesNoSettingsApply, setSettings } = SettingsStore.getState();
  return (
    <ModalYesNo
        message="Apply Changes"
        message2="Are you sure you want to apply these changes?"
        onClose={() => setYesNoSettingsApply(false)}
        onYes={() => {
            setYesNoSettingsApply(false);
            setSettings();
        }}
    />
  );
}

export const yesNoSettingsResetModal = () => {
  const { setYesNoSettingsReset, resetSettings } = SettingsStore.getState();
  return (
    <ModalYesNo
        message="Reset to Defaults"
        message2="Are you sure you want to reset these settings to defaults?"
        onClose={() => setYesNoSettingsReset(false)}
        onYes={() => {
            setYesNoSettingsReset(false);
            resetSettings();
        }}
    />
  );
}


