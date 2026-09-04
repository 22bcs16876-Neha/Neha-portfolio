import localtunnel from 'localtunnel';
import fs from 'fs';

(async () => {
  try {
    // Try with custom subdomain or let localtunnel assign one
    const tunnel = await localtunnel({ port: 5173 });
    console.log('PUBLIC_TUNNEL_URL: ' + tunnel.url);
    
    // Also fetch public IP for localtunnel friendly verification
    try {
      const res = await fetch('https://loca.lt/mytunnelpassword');
      const ip = await res.text();
      console.log('TUNNEL_PASSWORD_IP: ' + ip.trim());
    } catch {}

    tunnel.on('close', () => {
      console.log('Tunnel was closed');
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel encountered error:', err);
    });
  } catch (err) {
    console.error('Failed to start localtunnel:', err);
  }
})();
