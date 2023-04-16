import { create } from "zustand";
import axios from "axios";

const useProducts = create((
  (set) => ({
    products: [],
    loading:true,
    fetchProducts: async (keyword = "",currentPage=1,price=[0,25000],category) => {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if(category)link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
      const response = await axios.get(link);
      set({ products: response.data,loading:false});
    },
    productDetails: 0,
    fetchProductDetails: async (id) => {
      const response = await axios.get(`/api/v1/${id}`);
      set({ productDetails: response.data,loading:false});
    },
  })
));

export default useProducts