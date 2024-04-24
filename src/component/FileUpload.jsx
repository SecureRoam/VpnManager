import React,  { useState } from 'react';
import './FileUpload.css';
import PropTypes from 'prop-types';
import Cockpit from 'cockpit';
import { Button, Form, FormGroup, FormSelect, TextInput, TextArea } from '@patternfly/react-core';

const FileUpload = ({ isDisabled }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setStatus('Veuillez sélectionner un fichier .ovpn');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const config = reader.result;

      Cockpit.file('/etc/openvpn/client.ovpn', { superuser: 'try' })
        .replace(config)
        .done(() => {
          // Démarrer OpenVPN avec la nouvelle configuration
          setStatus('OpenVPN démarré avec succès');
	        Cockpit.spawn(['sh', '/home/test/op.sh'], {
            superuser: 'try',
            err: 'message',
          })
            .done(() => {
              setStatus('OpenVPN démarré avec succès');
            })
            .fail((error) => {
              setStatus(`Erreur lors du démarrage d'OpenVPN : ${error.message}`);
            });
        })
        .fail((error) => {
          setStatus(`Erreur lors de l'écriture du fichier : ${error.message}`);
        });
    };

    reader.readAsText(file);
  };

  FileUpload.propTypes = {
    isDisabled: PropTypes.bool,
  };
  
  FileUpload.defaultProps = {
    isDisabled: false,
  };

  return (
    <div className={`file-upload ${isDisabled ? 'disabled' : ''}`}>
    <Form onSubmit={handleFormSubmit}>
      <FormGroup label="Fichier .ovpn">
        <input type="file" accept=".ovpn" onChange={handleFileChange} />
      </FormGroup>
      <Button type="submit" variant="primary">Importer et démarrer OpenVPN</Button>
      <div>{status}</div>
    </Form>
    </div>
  );
};

export default FileUpload;
