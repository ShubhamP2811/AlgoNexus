import { generateLinearSearchSteps } from './linearSearch';
import { generateBinarySearchSteps } from './binarySearch';

export const SEARCHING_ALGORITHMS = {
  'linear-search': generateLinearSearchSteps,
  'binary-search': generateBinarySearchSteps
};

export {
  generateLinearSearchSteps,
  generateBinarySearchSteps
};
