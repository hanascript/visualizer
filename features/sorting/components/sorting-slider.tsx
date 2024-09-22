import { Slider } from '@/components/ui/slider';
import { MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED } from '../lib/constants';
import { useSortingAlgorithm } from '../hooks/use-sorting-algorithm';

export const SortingSlider = () => {
  const { speed, setSpeed } = useSortingAlgorithm();

  return (
    <Slider
      defaultValue={[speed]}
      min={MIN_ANIMATION_SPEED}
      max={MAX_ANIMATION_SPEED}
      step={1}
      onValueChange={value => setSpeed(value)}
    />
  );
};
