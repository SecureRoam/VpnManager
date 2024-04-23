import React, { useState } from 'react';
import './SegmentedControl.css';

const SegmentedControl = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSegmentClick = (index) => {
    setSelectedIndex(index);
  };

	//A implementer pour changer entre  Openvpn <-> Tor <-> Rien en fonction de la position
 
  return (
    <div className="segmented-control">
      <button
        className={`segment ${selectedIndex === 0 ? 'selected' : ''}`}
        onClick={() => handleSegmentClick(0)}
      >
        NoEN
      </button>
      <button
        className={`segment ${selectedIndex === 1 ? 'selected' : ''}`}
        onClick={() => handleSegmentClick(1)}
      >
        OpenVPN
      </button>
      <button
        className={`segment ${selectedIndex === 2 ? 'selected' : ''}`}
        onClick={() => handleSegmentClick(2)}
      >
        Tor
      </button>
    </div>
  );
};

export default SegmentedControl;