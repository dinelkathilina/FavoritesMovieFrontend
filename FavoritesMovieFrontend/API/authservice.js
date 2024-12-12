import axios from 'axios';

 const API_URL = 'https://localhost:7219'; 

const authservice = {

login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      }
    );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        } : 'No response',
        request: error.request ? {
          method: error.request.method,
          url: error.request.url,
          headers: error.request.headers
        } : 'No request'
      });
      throw error;
    }
  },

  register: async ( email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        
        email,
        password
        
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

  export default authservice;