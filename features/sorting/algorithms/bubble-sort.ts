import { AnimationArrayType } from '@/features/sorting/lib/types';

const runBubbleSort = (array: number[], animations: AnimationArrayType) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // First thing we arent swapping here, we are just comparing the values so we send false
      animations.push([[j, j + 1], false]); // just the item and the one next to it
      if (array[j] > array[j + 1]) {
        // If the value is greater than the one next to it, we swap
        animations.push([[j, array[j + 1]], true]); // We send true to swap the values
        animations.push([[j + 1, array[j]], true]); // We send true to swap the values
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // We swap the values
      }
    }
  }
};

export function generateBubbleSortAnimationArray(
  isRunning: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  // Defensive programming, this should never get triggered
  if (isRunning) return;
  if (array.length <= 1) return;

  // Initialize the animations array
  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice(); // Copy of our state array, we don't want to modify the original array

  runBubbleSort(auxiliaryArray, animations);
  runAnimation(animations);
}
