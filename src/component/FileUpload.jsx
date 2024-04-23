import React from 'react';
import './FileUpload.css';

function FileUpload() {
 //Dire ou mettre le fichier pour que ça casse pas tout 
 return (
    <div className="file-upload">
      <h3>Upload OpenVPN Configuration</h3>
      <input type="file" />
    </div>
  );
}

export default FileUpload;
