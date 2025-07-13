import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Fetch all mining pools (basic info).
 * @returns {Promise<Object[]>} List of mining pools.
 */
export const getMiningPools = async () => {
  const response = await axios.get(`${API_BASE_URL}/mining-pools`);
  return response.data;
};

/**
 * Fetch detailed info for a single mining pool.
 * @param {string} id - Mining pool ID
 * @returns {Promise<Object>} Detailed mining pool info
 */
export const getMiningPoolDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/mining-pools/${id}`);
  return response.data;
};
