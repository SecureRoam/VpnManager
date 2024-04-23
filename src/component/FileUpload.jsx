import React from 'react';
import { Button } from '@patternfly/react-core'; // Importation du composant Button depuis le module Patternfly
import './FileUpload.css';

function FileUpload() {
  //Définir une fonction pour gérer le changement de fichier
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Faites quelque chose avec le fichier ici, par exemple : 
    console.log('Nom du fichier :', file.name);
    console.log('Taille du fichier :', file.size);
    console.log('Type de fichier :', file.type);
  };

  return (
    <div className="file-upload">
      <h3>Upload OpenVPN Configuration</h3>
      {/* Utilisation du composant Button de Patternfly pour l'importation de fichier */}
      <label htmlFor="file-upload-input">
        <Button variant="primary" component="label">
          Fichier .ovpn
          <input
            type="file"
            id="file-upload-input"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Button>
      </label>
    </div>
  );
}

export default FileUpload;
