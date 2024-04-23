import React, { useState } from 'react';
import Cockpit from 'cockpit';
import './OpenVpnForm.css';

function OpenVpnForm() {
  // Add state variables for form inputs
  const [clientConfig, setClientConfig] = useState('');
  const [remoteConfig, setRemoteConfig] = useState('');
  const [authUserPass, setAuthUserPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ca, setCa] = useState('');
  const [cert, setCert] = useState('');
  const [key, setKey] = useState('');
  const [tlsAuth, setTlsAuth] = useState(false);
  const [tlsCrypt, setTlsCrypt] = useState(false);
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
      case 'ca':
        setCa(value);
        break;
      case 'cert':
        setCert(value);
        break;
      case 'key':
        setKey(value);
        break;
      case 'tlsAuth':
        setTlsAuth(event.target.checked);
        break;
      case 'tlsCrypt':
        setTlsCrypt(event.target.checked);
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
${ca}
</ca>
<cert>
${cert}
</cert>
<key>
${key}
</key>
tls-auth
${tlsAuth ? 'ta.key 1' : ''}
tls-crypt
${tlsCrypt ? 'tls-crypt v2' : ''}
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
    <div>
      <h2>OpenVPN Configuration</h2>
      <div>
        <label htmlFor="clientConfig">Client Configuration:</label>
        <textarea
          id="clientConfig"
          name="clientConfig"
          value={clientConfig}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </div>
      <div>
        <label htmlFor="remoteConfig">Remote Configuration:</label>
        <textarea
          id="remoteConfig"
          name="remoteConfig"
          value={remoteConfig}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </div>
      <div>
        <label htmlFor="authUserPass">Use Auth User/Pass:</label>
        <input
          type="checkbox"
          id="authUserPass"
          name="authUserPass"
          checked={authUserPass}
          onChange={handleInputChange}
        />
      </div>
      {authUserPass && (
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div>
        <label htmlFor="ca">CA Cert:</label>
        <textarea
          id="ca"
          name="ca"
          value={ca}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </div>
      <div>
        <label htmlFor="cert">Cert:</label>
        <textarea
          id="cert"
          name="cert"
          value={cert}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </div>
      <div>
        <label htmlFor="key">Key:</label>
        <textarea
          id="key"
          name="key"
          value={key}
          onChange={handleInputChange}
          rows={10}
          cols={50}
        />
      </div>
      <div>
        <label htmlFor="tlsAuth">Use TLS Auth:</label>
        <input
          type="checkbox"
          id="tlsAuth"
          name="tlsAuth"
          checked={tlsAuth}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tlsCrypt">Use TLS Crypt:</label>
        <input
          type="checkbox"
          id="tlsCrypt"
          name="tlsCrypt"
          checked={tlsCrypt}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tlsVersionMin">TLS Version Min:</label>
        <input
          type="text"
          id="tlsVersionMin"
          name="tlsVersionMin"
          value={tlsVersionMin}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cipher">Cipher:</label>
        <input
          type="text"
          id="cipher"
          name="cipher"
          value={cipher}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="hmac">HMAC:</label>
        <input
          type="text"
          id="hmac"
          name="hmac"
          value={hmac}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="auth">Auth:</label>
        <input
          type="text"
          id="auth"
          name="auth"
          value={auth}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="rsa">RSA:</label>
        <input
          type="number"
          id="rsa"
          name="rsa"
          value={rsa}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="dh">DH:</label>
        <input
          type="number"
          id="dh"
          name="dh"
          value={dh}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ncpCiphers">NCP Ciphers:</label>
        <input
          type="text"
          id="ncpCiphers"
          name="ncpCiphers"
          value={ncpCiphers}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ncpEnabled">NCP Enabled:</label>
        <input
          type="checkbox"
          id="ncpEnabled"
          name="ncpEnabled"
          checked={ncpEnabled}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tlsCipher">TLS Cipher:</label>
        <input
          type="text"
          id="tlsCipher"
          name="tlsCipher"
          value={tlsCipher}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="tlsCryptV2">Use TLS Crypt V2:</label>
        <input
          type="checkbox"
          id="tlsCryptV2"
          name="tlsCryptV2"
          checked={tlsCryptV2}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleSave}>Save Configuration</button>
    </div>
  );
}

export default OpenVpnForm;
