import { generateBubbleSortAnimationArray } from '@/features/sorting/algorithms/bubble-sort';
import { generateInsertionSortAnimationArray } from '@/features/sorting/algorithms/insertion-sort';
import { generateMergeSortAnimationArray } from '@/features/sorting/algorithms/merge-sort';
import { generateQuickSortAnimationArray } from '@/features/sorting/algorithms/quick-sort';
import { generateSelectionSortAnimationArray } from '@/features/sorting/algorithms/selection-sort';
import { AnimationArrayType, SortingAlgorithmType } from '@/features/sorting/lib/types';

export function generateRandomNumberFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateAnimationArray(
  selectedAlgorithm: SortingAlgorithmType,
  isRunning: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  switch (selectedAlgorithm) {
      case 'bubble':
          // Generate the bubble sort animations
          generateBubbleSortAnimationArray(isRunning, array, runAnimation);
          break;
      case 'quick':
          generateQuickSortAnimationArray(isRunning, array, runAnimation);
          break;
      case 'merge':
          generateMergeSortAnimationArray(isRunning, array, runAnimation);
          break;
      case 'insertion':
          generateInsertionSortAnimationArray(isRunning, array, runAnimation);
          break;
      case 'selection':
          generateSelectionSortAnimationArray(isRunning, array, runAnimation);
          break;
      default:
          break;
  }
}
