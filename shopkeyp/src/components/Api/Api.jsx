import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

class ShopkeypApi {
  static async register(data) {
    const res = await axios.post(`${BASE_API_URL}/auth/register`, data);
    return res.data;
  }
  
  static async login(data) {
      const res = await axios.post(`${BASE_API_URL}/auth/login`, data);
      return res.data;
  }
}

export default ShopkeypApi;