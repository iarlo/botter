import fetch from 'node-fetch';

class PlayerInfo {
  public static async getUser(nick: string) {
    return fetch(`https://api.mojang.com/users/profiles/minecraft/${nick}`);
  }

  public static async getNameHistory(uuid: string) {
    const data = await fetch(
      `https://api.mojang.com/user/profiles/${uuid}/names`,
    );
    const nameHistory = await data.json();
    const nameArray = [];
    for (let i = nameHistory.length - 1; i >= 0; i -= 1) {
      if (i !== nameHistory.length - 1) {
        // prettier-ignore
        if (nameArray.indexOf(nameHistory[i].name) === -1) nameArray.push(nameHistory[i].name);
        if (nameArray.length >= 4) break;
      }
    }
    return nameArray;
  }
}

export default PlayerInfo;
