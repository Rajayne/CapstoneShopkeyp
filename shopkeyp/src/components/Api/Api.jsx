import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

class ShopkeypApi {
  static async register(data) {
    try {
      const res = await axios.post(`${BASE_API_URL}/auth/register`, data);
      return res.data;
    } catch (e) {
      return e;
    }
  }
}

export default ShopkeypApi;