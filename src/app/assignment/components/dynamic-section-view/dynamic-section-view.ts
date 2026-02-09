import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSection, DynamicSectionItem } from '../../types';

@Component({
  selector: 'app-dynamic-section-view',
  imports: [CommonModule],
  templateUrl: './dynamic-section-view.html',
  styleUrl: './dynamic-section-view.scss',
})
export class DynamicSectionView {
  readonly sections = input.required<DynamicSection>();

  getResults(numbers: readonly DynamicSectionItem[]): number {
    return numbers.reduce((sum, item) => sum + item.value, 0);
  }
}
