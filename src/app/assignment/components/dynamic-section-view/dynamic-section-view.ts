import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-view',
  imports: [CommonModule],
  templateUrl: './dynamic-section-view.html',
  styleUrl: './dynamic-section-view.scss',
})
export class DynamicSectionView {
  readonly sections = input.required<DynamicSection>();

  getResults(numbers: readonly number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
  }
}
