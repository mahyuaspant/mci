// state.js
import { create } from "zustand";

export const usePagination = create((set) => ({
  currentPage: 1,
  searchTerm: "",
  // Function to increment the current page
  nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  // Function to decrement the current page
  prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  // Function to reset the current page to 1
  resetPage: () => set({ currentPage: 1 }),
  // Function to set the search term
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  // Function to reset the search term
  resetSearch: () => set({ searchTerm: "" }),
}));

export default usePagination;
