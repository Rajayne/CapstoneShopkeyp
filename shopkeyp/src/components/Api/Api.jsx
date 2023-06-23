import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

class ShopkeypApi {
  static async login(data) {
    try {
      const result = await axios.post(`${BASE_API_URL}/auth/login`, data);
      console.log("RESULT", result)
      return result.data;
    } catch (e) {
      console.log("API ERR", e)
      return e;
    }
  }
}

export default ShopkeypApi;