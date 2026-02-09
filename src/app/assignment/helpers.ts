import { DynamicSection } from './types';

export function createSection(): readonly number[] {
  return [0];
}

export function createDynamicSection(): DynamicSection {
  return [createSection()];
}
