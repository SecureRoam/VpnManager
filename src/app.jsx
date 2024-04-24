import React from 'react';
import cockpit from 'cockpit'
import './app.scss';
import Layout from './Layout';
import ConnectionStatus from './component/ConnectionStatus';
import ToggleSwitch from './component/ToggleSwitch';
import FileUpload from './component/FileUpload';
import OpenVpnForm from './component/OpenVpnForm';
const _ = cockpit.gettext;

export const Application = () => {
  const [isOpenVpnEnabled, setIsOpenVpnEnabled] = React.useState(false);
  const [isAnotherFeatureEnabled, setIsAnotherFeatureEnabled] = React.useState(false);

  const handleOpenVpnToggle = (isEnabled) => {
    setIsOpenVpnEnabled(isEnabled);
  };

  return (
    <div className="App">
      <Layout>
      <ToggleSwitch isOpenVpnEnabled={isOpenVpnEnabled} onToggle={handleOpenVpnToggle} />
        <ConnectionStatus />
        <FileUpload isDisabled={!isOpenVpnEnabled} />
        <OpenVpnForm isDisabled={!isOpenVpnEnabled} />
      </Layout>
    </div>
  );
};
