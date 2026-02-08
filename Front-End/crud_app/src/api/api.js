import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Log errors for debugging
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const api = {
  /**
   * GET all users
   * @returns {Promise<Array>} Array of user objects
   */
  getUsers: async () => {
    return await axiosInstance.get('/users');
  },

  /**
   * GET single user by ID
   * @param {string} id - User ID
   * @returns {Promise<Object>} User object
   */
  getUser: async (id) => {
    return axiosInstance.get(`/users/${id}`);
  },

  /**
   * POST - Create new user
   * @param {Object} userData - User data object
   * @returns {Promise<Object>} Created user object with ID
   */
  createUser: async (userData) => {
    return await axiosInstance.post('/users', userData);
  },

  /**
   * PUT - Update existing user
   * @param {string} id - User ID to update
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user object
   */
  updateUser: async (id, userData) => {
    return axiosInstance.put(`/users/${id}`, userData);
  },

  /**
   * DELETE - Remove user
   * @param {string} id - User ID to delete
   * @returns {Promise<void>}
   */
  deleteUser: async (id) => {
    return axiosInstance.delete(`/users/${id}`);
  },
};

export default api;