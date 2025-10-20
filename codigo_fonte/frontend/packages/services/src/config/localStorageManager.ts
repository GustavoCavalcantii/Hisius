const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
};

class LocalStorageManager {
  static setTokens(accessToken) {
    this.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  static getAccessToken() {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  static clearTokens() {
    this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  static setUser(user) {
    this.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static getUser() {
    const user = this.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  static clearUser() {
    this.removeItem(STORAGE_KEYS.USER);
  }

  static setItem(key, value) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Erro ao salvar no localStorage [${key}]:`, error);
    }
  }

  static getItem(key) {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.error(`Erro ao ler do localStorage [${key}]:`, error);
      return null;
    }
  }

  static removeItem(key) {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erro ao remover do localStorage [${key}]:`, error);
    }
  }

  static clear() {
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    } catch (error) {
      console.error("Erro ao limpar localStorage:", error);
    }
  }

  static hasToken() {
    return !!this.getAccessToken();
  }

  static isAuthenticated() {
    return this.hasToken();
  }

  static clearAuth() {
    this.clearTokens();
    this.clearUser();
  }

  static clearAll() {
    this.clear();
  }

  static getAllItems() {
    try {
      if (typeof window !== "undefined") {
        const items = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            items[key] = localStorage.getItem(key);
          }
        }
        return items;
      }
      return {};
    } catch (error) {
      console.error("Erro ao obter todos os itens do localStorage:", error);
      return {};
    }
  }

  static getStorageSize() {
    try {
      if (typeof window !== "undefined") {
        let total = 0;
        for (let key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
          }
        }
        return total;
      }
      return 0;
    } catch (error) {
      console.error("Erro ao calcular tamanho do localStorage:", error);
      return 0;
    }
  }
}

export default LocalStorageManager;
export { STORAGE_KEYS };
