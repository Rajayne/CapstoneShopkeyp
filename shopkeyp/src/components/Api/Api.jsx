import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

class ShopkeypApi {
  static async register(authToken) {
    const res = await axios.post(`${BASE_API_URL}/auth/register`, authToken);
    return res.data;
  }
  
  static async login(authToken) {
      const res = await axios.post(`${BASE_API_URL}/auth/login`, authToken);
      return res.data;
  }

  static async getShop(authToken) {
    const res = await axios.get(`${BASE_API_URL}/shop`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async getUser(username, authToken) {
    const res = await axios.get(`${BASE_API_URL}/users/${username}`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async buyItem(data, authToken) {
    const res = await axios.post(`${BASE_API_URL}/shop/item/${data.itemId}/purchase`, data, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }
}

export default ShopkeypApi;