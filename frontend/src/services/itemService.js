import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/items`;

export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const getItemCombinations = async (itemId) => {
  const response = await axios.get(`${API_URL}/${itemId}/combinations`);
  return response.data;
};

export const updateCombination = async (itemId, index, price, quantity) => {
  const response = await axios.put(
    `${API_URL}/${itemId}/combinations/${index}`,
    {
      price,
      quantity,
    }
  );
  return response.data;
};
