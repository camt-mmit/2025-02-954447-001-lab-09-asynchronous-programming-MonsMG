import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSection } from '../../types';
import { computed } from '@angular/core';

@Component({
  selector: 'app-dynamic-section-view',
  imports: [CommonModule],
  templateUrl: './dynamic-section-view.html',
  styleUrl: './dynamic-section-view.scss',
})
export class DynamicSectionView {
  readonly data = input.required<DynamicSection>();

  readonly sumResult = computed(() => this.data().map((section) => section.reduce((a, b) => a + b, 0)));
}
