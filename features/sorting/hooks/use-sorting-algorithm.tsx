import { MAX_ANIMATION_SPEED } from '@/features/sorting/lib/constants';
import { AnimationArrayType, SortingAlgorithmType } from '@/features/sorting/lib/types';
import { generateRandomNumberFromInterval } from '@/features/sorting/lib/utils';
import { create } from 'zustand';

type State = {
  arrayToSort: number[];
  algorithm: SortingAlgorithmType;
  isRunning: boolean;
  speed: number;
  isSorted: boolean;
};

type Action = {
  setSpeed: (speed: number[]) => void;
  setAlgorithm: (algorithm: SortingAlgorithmType) => void;
  resetArrayAnimation: () => void;
  runAnimation: (animations: AnimationArrayType) => void;
};

type AlgorithmState = State & Action;

export const useSortingAlgorithm = create<AlgorithmState>((set, get) => ({
  // Initial State
  arrayToSort: [],
  algorithm: 'bubble',
  isRunning: false,
  speed: MAX_ANIMATION_SPEED,
  isSorted: false,

  setSpeed: speed => set({ speed: speed[0] }),
  setAlgorithm: algorithm => set({ algorithm: algorithm }),

  resetArrayAnimation: () => {
    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) {
      console.log('Content container not found');
      return;
    }

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 24;
    const containerHeight = contentContainer.clientHeight;
    const maxLineHeight = Math.max(containerHeight - 10, 100);

    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(25, maxLineHeight));
    }

    set({ arrayToSort: tempArray, isSorted: false, isRunning: false });

    // Reset timeouts
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);

    setTimeout(() => {
      const arrayLines = document.getElementsByClassName('array-line');
      for (let i = 0; i < arrayLines.length; i++) {
        arrayLines[i].classList.remove('change-line-color');
        arrayLines[i].classList.remove('animate-pulse');
        arrayLines[i].classList.add('default-line-color');
      }
    }, 0);
  },

  runAnimation: (animations: AnimationArrayType) => {
    set({ isRunning: true, isSorted: false });

    console.log('Frames: ', animations.length);

    const { speed } = get();

    const inverseSpeed = (1 / speed) * 400;
    const arrayLines = document.getElementsByClassName('array-line') as HTMLCollectionOf<HTMLElement>;

    // This function just updates the color of the lines
    const updateLineColor = (indexes: number[], addClassName: string, removeClassName: string) => {
      indexes.forEach(index => {
        arrayLines[index].classList.add(addClassName);
        arrayLines[index].classList.remove(removeClassName);
      });
    };

    // This function just updates the height of the lines
    const updateHeightValue = (lineIndex: number, newHeight: number | undefined) => {
      if (newHeight === undefined) return;
      set(state => {
        const newArray = [...state.arrayToSort];
        newArray[lineIndex] = newHeight;
        return { arrayToSort: newArray };
      });
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        // values is an array of two values. It can be [lineIndex, newHeight] or [lineIndex1, lineIndex2]
        // isSwap will always be a boolean
        // We get these values from the animation generator function
        const [values, isSwap] = animation;

        // If isSwap is false, we are only changing the colors to show the comparison
        if (!isSwap) {
          updateLineColor(values, 'change-line-color', 'default-line-color');
          // revert the colors back at the inverse speed
          setTimeout(() => {
            updateLineColor(values, 'default-line-color', 'change-line-color');
          }, inverseSpeed);
        } else {
          // If isSwap is true, we are changing the heights
          const [lineIndex, newHeight] = values;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });

    const finalTimeout = animations.length * inverseSpeed;

    setTimeout(() => {
      Array.from(arrayLines).forEach(line => {
        line.classList.add('animate-pulse');
      });

      setTimeout(() => {
        set({ isRunning: false, isSorted: true });
      }, 500);
    }, finalTimeout);
  },
}));
