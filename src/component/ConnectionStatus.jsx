import React from 'react';
import './ConnectionStatus.css';

function ConnectionStatus() {
  // Trouver la logique du bordel et la mettre la
  return (
    <div className="connection-status">
      <h3>Connection Status</h3>
      <p>Server IP: 123.456.789.012</p>
      <p>Speed: 100 Mbps</p>
    </div>
  );
}

export default ConnectionStatus;
