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

  static async getUser(username, authToken) {
    const res = await axios.get(`${BASE_API_URL}/users/${username}`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async getUserById(userId, authToken) {
    const res = await axios.get(`${BASE_API_URL}/users/id/${userId}`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async updateUser(data, authToken) {
    const res = await axios.patch(`${BASE_API_URL}/users/${data.username}/edit`, data, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async allUsers(authToken) {
    const res = await axios.get(`${BASE_API_URL}/admin/users`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async makeAdmin(username, authToken) {
    const config = { headers: { Authorization: `Bearer ${authToken}` } }
    const res = await axios.patch(`${BASE_API_URL}/admin/users/${username}/makeAdmin`, username, config);
    return res.data;
  }

  static async removeAdmin(username, authToken) {
    const config = { headers: { Authorization: `Bearer ${authToken}` } }
    const res = await axios.patch(`${BASE_API_URL}/admin/users/${username}/removeAdmin`, username, config);
    return res.data;
  }

  static async allItems(authToken) {
    const res = await axios.get(`${BASE_API_URL}/admin/items`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async updateItem(data, authToken) {
    const res = await axios.patch(`${BASE_API_URL}/admin/items/${data.itemId}/edit`, data, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async addItem(data, authToken) {
    const res = await axios.post(`${BASE_API_URL}/admin/items/new`, data, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async allTransactions(authToken) {
    const res = await axios.get(`${BASE_API_URL}/transactions`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async getTransaction(transactionId, authToken) {
    const res = await axios.get(`${BASE_API_URL}/transactions/${transactionId}`, { headers: { Authorization: `Bearer ${authToken}`} });
    return res.data;
  }

  static async getShop(authToken) {
    const res = await axios.get(`${BASE_API_URL}/shop`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async getItem(itemId, authToken) {
    const res = await axios.get(`${BASE_API_URL}/shop/item/${itemId}`, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }

  static async buyItem(data, authToken) {
    const res = await axios.post(`${BASE_API_URL}/shop/item/${data.itemId}/purchase`, data, { headers: { Authorization: `Bearer ${authToken}` } });
    return res.data;
  }
}

export default ShopkeypApi;