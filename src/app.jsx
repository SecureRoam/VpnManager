import React from 'react';
import cockpit from 'cockpit'
import './app.scss';
import Layout from './Layout';
import ConnectionStatus from './component/ConnectionStatus';
import SegmentedControl from './component/SegmentedControl';
import FileUpload from './component/FileUpload';
import OpenVpnForm from './component/OpenVpnForm';
const _ = cockpit.gettext;

export const Application = () => {
  return (
    <div className="App">
      <Layout>
        <SegmentedControl />
        <ConnectionStatus />
        <FileUpload />
        <OpenVpnForm />
      </Layout>
    </div>
  );
};
