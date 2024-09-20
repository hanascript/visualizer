import { create } from 'zustand';

type AlgorithmState = {
  arrayToSort: number[];
  setArrayToSort: (newArray: number[]) => void;
};

export const useSortingAlgorithm = create<AlgorithmState>(set => ({
  arrayToSort: [],
  setArrayToSort: newArray => set({ arrayToSort: newArray }),
}));
