import React from 'react';
import PropTypes from 'prop-types';
import './ToggleSwitch.css';

const ToggleSwitch = ({ isOpenVpnEnabled, onToggle }) => {
  const handleToggle = (event) => {
    onToggle(event.target.checked);
  };

  return (
    <div className="toggle-switch">
    <label>
      <input type="checkbox" checked={isOpenVpnEnabled} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  </div>
  );
};

ToggleSwitch.propTypes = {
  isOpenVpnEnabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleSwitch;