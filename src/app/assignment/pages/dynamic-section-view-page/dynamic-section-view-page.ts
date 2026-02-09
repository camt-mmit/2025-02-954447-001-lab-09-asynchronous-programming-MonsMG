import { Component, signal, inject } from '@angular/core';
import { DynamicSectionView } from '../../components/dynamic-section-view/dynamic-section-view';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';
import { DynamicSection } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-section-view-page',
  imports: [CommonModule, DynamicSectionView],
  templateUrl: './dynamic-section-view-page.html',
  styleUrl: './dynamic-section-view-page.scss',
})
export class DynamicSectionViewPage {
  private storage = inject(DynamicSectionDataStorage);

  data = signal<DynamicSection>([]);

  constructor() {
    this.loadData();
  }

  async loadData() {
    const result = await this.storage.get();
    if (result) {
      this.data.set(result);
    }
  }
}
