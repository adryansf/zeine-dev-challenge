import { create } from "zustand";

// Types
import {
  GetApiProductsStatus,
  GetApiProductsCategory,
} from "@/orval/api.schemas";

interface IFilters {
  search?: string;
  status?: GetApiProductsStatus;
  category?: GetApiProductsCategory;
}

interface IStore {
  page: number;
  loading: boolean;
  filters: IFilters;
  setPage: (page: number) => void;
  setFilters: (filters: IFilters) => void;
  setLoading: (loading: boolean) => void;
}

// Store
export const useProductsAreaStore = create<IStore>((set) => ({
  page: 1,
  loading: false,
  filters: {},

  // Actions
  setPage: (page: number) => set({ page }),
  setFilters: (filters: IFilters) => set({ filters }),
  setLoading: (loading: boolean) => set({ loading }),
}));
