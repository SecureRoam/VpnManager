import React from 'react';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <div className="layout-header">
      <div className="layout-header-segmented-control">{children[0]}</div>
    </div>
    <div className="layout-body">
      <div className="layout-body-left">{children[1]}</div>
      <div className="layout-body-right">
        {children[2]}
        {children[3]}
      </div>
    </div>
  </div>
);

export default Layout;
