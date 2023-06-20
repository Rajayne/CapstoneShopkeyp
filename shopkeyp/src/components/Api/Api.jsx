import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

class ShopkeypApi {
  static async getUsers() {
    const result = await axios.get(`${BASE_API_URL}/users`);
    return result.data;
  }

  static async getItems() {
    const result = await axios.get(`${BASE_API_URL}/items`);
    return result.data;
  }

  static async getTransactions() {
    const result = await axios.post(`${BASE_API_URL}/transactions`);
    return result.data;
  }
}

export default ShopkeypApi;