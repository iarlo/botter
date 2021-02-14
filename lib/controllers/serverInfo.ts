import fetch from 'node-fetch';

class ServerInfo {
  public static getServerInfo(ip: string) {
    return fetch(`https://eu.mc-api.net/v3/server/ping/${ip}`);
  }
}

export default ServerInfo;
