import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import './ConnectionStatus.css';
import cockpit from 'cockpit';
const _ = cockpit.gettext;

function ConnectionStatus() {
  const [hostname, setHostname] = useState(_('Unknown'));
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    cockpit.file('/etc/hostname').watch(content => {
      setHostname(content.trim());
    });
    fetchIpInfo();
  }, []);

const fetchIpInfo = async () => {
  try {
    const ipInfoTmp = [];
    await cockpit.spawn(['curl', '-s', 'https://ipapi.co/json'], { superuser: 'try' }).stream((data) => {
      ipInfoTmp.push(Buffer.from(data));
    });
    const data = Buffer.concat(ipInfoTmp).toString();
    const ipInfo = JSON.parse(data);
    setIpInfo(ipInfo);
  } catch (error) {
    console.error('Failed to fetch ip info', error);
  }
};


  return (
    <div className="connection-status">
      <h3>Connection Status</h3>
      {ipInfo && (
        <>
          <p>Public IP: {ipInfo.ip}</p>
          <p>Region: {ipInfo.region}</p>
          <p>City: {ipInfo.city}</p>
          <p>Country: {ipInfo.country_name}</p>
        </>
      )}
    </div>
  );
}

export default ConnectionStatus;
