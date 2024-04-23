import React, { useState } from 'react';
import {
  Checkbox,
  FormGroup,
  TextArea,
  TextInput,
  Button,
} from '@patternfly/react-core';
import './OpenVpnForm.css';
import Cockpit from 'cockpit';

function OpenVpnForm() {
  // Add state variables for form inputs
  const [clientConfig, setClientConfig] = useState('');
  const [remoteConfig, setRemoteConfig] = useState('');
  const [authUserPass, setAuthUserPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [caFile, setCaFile] = useState(''); 
  const [certFile, setCertFile] = useState(''); 
  const [keyFile, setKeyFile] = useState(''); 
  const [tlsAuthFile, setTlsAuthFile] = useState(false); 
  const [tlsCryptFile, setTlsCryptFile] = useState(false); 
  const [tlsVersionMin, setTlsVersionMin] = useState('TLSv1.2');
  const [cipher, setCipher] = useState('AES-256-CBC');
  const [hmac, setHmac] = useState('SHA256');
  const [auth, setAuth] = useState('SHA256');
  const [rsa, setRsa] = useState('4096');
  const [dh, setDh] = useState('2048');
  const [ncpCiphers, setNcpCiphers] = useState('');
  const [ncpEnabled, setNcpEnabled] = useState(false);
  const [tlsCipher, setTlsCipher] = useState('');
  const [tlsCryptV2, setTlsCryptV2] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'clientConfig':
        setClientConfig(value);
        break;
      case 'remoteConfig':
        setRemoteConfig(value);
        break;
      case 'authUserPass':
        setAuthUserPass(event.target.checked);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
        case 'caFile': 
        setCaFile(value);
        break;
      case 'certFile': 
        setCertFile(value);
        break;
      case 'keyFile': 
        setKeyFile(value);
        break;
      case 'tlsAuthFile': 
        setTlsAuthFile(event.target.checked);
        break;
      case 'tlsCryptFile': 
        setTlsCryptFile(event.target.checked);
        break;
      case 'tlsVersionMin':
        setTlsVersionMin(value);
        break;
      case 'cipher':
        setCipher(value);
        break;
      case 'hmac':
        setHmac(value);
        break;
      case 'auth':
        setAuth(value);
        break;
      case 'rsa':
        setRsa(value);
        break;
      case 'dh':
        setDh(value);
        break;
      case 'ncpCiphers':
        setNcpCiphers(value);
        break;
      case 'ncpEnabled':
        setNcpEnabled(event.target.checked);
        break;
      case 'tlsCipher':
        setTlsCipher(value);
        break;
      case 'tlsCryptV2':
        setTlsCryptV2(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    const config = `
    client
    ${clientConfig}
    remote
    ${remoteConfig}
    auth-user-pass
    ${authUserPass ? `${username} ${password}` : ''}
    <ca>
    ${caFile}
    </ca>
    <cert>
    ${certFile}
    </cert>
    <key>
    ${keyFile}
    </key>
    tls-auth
    ${tlsAuthFile ? 'ta.key 1' : ''}
    tls-crypt
    ${tlsCryptFile ? 'tls-crypt v2' : ''}
    tls-version-min
    ${tlsVersionMin}
    cipher
    ${cipher}
    hmac
    ${hmac}
    auth
    ${auth}
    rsa
    ${rsa}
    dh
    ${dh}
    ncp-ciphers
    ${ncpCiphers}
    ncp-enabled
    ${ncpEnabled ? 'yes' : 'no'}
    tls-cipher
    ${tlsCipher}
    tls-crypt-v2
    ${tlsCryptV2 ? 'yes' : 'no'}
    `;

    const filePath = '/etc/openvpn/client.ovpn';

    Cockpit.file(filePath, {superuser : 'try'})
      .replace(config)
      .then(() => {
        // File was saved successfully
        console.log('OpenVPN configuration saved');
      })
      .catch((error) => {
        // An error occurred while saving the file
        console.error('Error saving OpenVPN configuration:', error);
      });
  };


  return (
    <div className="openvpn-form">
      <div>
    <h2>OpenVPN Configuration</h2>
    <div className="openvpn-form-group">
      <FormGroup label="Client Configuration:" fieldId="clientConfig">
        <TextArea
          id="clientConfig"
          name="clientConfig"
          value={clientConfig}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </FormGroup>
      <FormGroup label="Remote Configuration:" fieldId="remoteConfig">
        <TextArea
          id="remoteConfig"
          name="remoteConfig"
          value={remoteConfig}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </FormGroup>
      <FormGroup label="" fieldId="authUserPass">
        <Checkbox
          id="authUserPass"
          isChecked={authUserPass}
          onChange={event => setAuthUserPass(event.target.checked)}
          label="Use Auth User/Pass"
        />
      </FormGroup>
      {authUserPass && (
        <div>
          <FormGroup label="Username:" fieldId="username">
            <TextInput
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup label="Password:" fieldId="password">
            <TextInput
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </FormGroup>
        </div>
      )}
      <FormGroup label="CA Cert:" fieldId="caFile">
        <TextArea
          id="caFile"
          name="caFile"
          value={caFile}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </FormGroup>
      <div>
        <FormGroup label="Cert:" fieldId="certFile">
          <TextArea
            id="certFile"
            name="certFile"
            value={certFile}
            onChange={handleInputChange}
            rows={10}
            cols={50}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Key:" fieldId="keyFile">
          <TextArea
            id="keyFile"
            name="keyFile"
            value={keyFile}
            onChange={handleInputChange}
            rows={10}
            cols={50}
          />
        </FormGroup>
      </div>
      <FormGroup label="" fieldId="tlsAuthFile">
        <Checkbox
          id="tlsAuthFile"
          isChecked={tlsAuthFile}
          onChange={event => setTlsAuthFile(event.target.checked)}
          label="Use TLS Auth"
        />
      </FormGroup>
      <FormGroup label="" fieldId="tlsCryptFile">
        <Checkbox
          id="tlsCryptFile"
          isChecked={tlsCryptFile}
          onChange={event => setTlsCryptFile(event.target.checked)}
          label="Use TLS Crypt"
        />
      </FormGroup>
      <div>
        <FormGroup label="TLS Version Min:" fieldId="tlsVersionMin">
          <TextInput
            type="text"
            id="tlsVersionMin"
            name="tlsVersionMin"
            value={tlsVersionMin}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Cipher:" fieldId="cipher">
          <TextInput
            type="text"
            id="cipher"
            name="cipher"
            value={cipher}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="HMAC:" fieldId="hmac">
          <TextInput
            type="text"
            id="hmac"
            name="hmac"
            value={hmac}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="Auth:" fieldId="auth">
          <TextInput
            type="text"
            id="auth"
            name="auth"
            value={auth}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="RSA:" fieldId="rsa">
          <TextInput
            type="number"
            id="rsa"
            name="rsa"
            value={rsa}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="DH:" fieldId="dh">
          <TextInput
            type="number"
            id="dh"
            name="dh"
            value={dh}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup label="NCP Ciphers:" fieldId="ncpCiphers">
          <TextInput
            type="text"
            id="ncpCiphers"
            name="ncpCiphers"
            value={ncpCiphers}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <FormGroup label="" fieldId="ncpEnabled">
        <Checkbox
          id="ncpEnabled"
          isChecked={ncpEnabled}
          onChange={event => setNcpEnabled(event.target.checked)}
          label="NCP Enabled"
        />
      </FormGroup>
      <div>
        <FormGroup label="TLS Cipher:" fieldId="tlsCipher">
          <TextInput
            type="text"
            id="tlsCipher"
            name="tlsCipher"
            value={tlsCipher}
            onChange={handleInputChange}
          />
        </FormGroup>
      </div>
      <FormGroup label="" fieldId="tlsCryptV2">
        <Checkbox
          id="tlsCryptV2"
          isChecked={tlsCryptV2}
          onChange={event => setTlsCryptV2(event.target.checked)}
          label="Use TLS Crypt V2"
        />
      </FormGroup>
      <Button onClick={handleSave} variant="primary">
        Save Configuration
      </Button>
    </div>
  </div>
</div>
);
}

export default OpenVpnForm;