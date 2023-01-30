import { create } from "zustand";
import {createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";

const useProducts = create(persist(
  (set, get) => ({
    products: [],
    loading:true,
    fetchProducts: async (keyword = "",currentPage=1) => {
      const response = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);
      set({ products: response.data,loading:false});
    },
    productDetails: 0,
    fetchProductDetails: async (id) => {
      const response = await axios.get(`/api/v1/${id}`);
      set({ productDetails: response.data,loading:false});
    },
  }),{
    name:"products",
    storage:createJSONStorage(()=>sessionStorage)
  }
));

export default useProducts