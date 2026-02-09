import { Component, effect, inject, resource } from '@angular/core';
import { DynamicSectionForm } from '../../components/dynamic-section-form/dynamic-section-form';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';

@Component({
  selector: 'app-dynamic-section-form-page',
  imports: [DynamicSectionForm],
  templateUrl: './dynamic-section-form-page.html',
  styleUrl: './dynamic-section-form-page.scss',
})
export class DynamicSectionFormPage {
  private readonly dataStorage = inject(DynamicSectionDataStorage);

  protected readonly dataResource = resource({
    loader: async () => (await this.dataStorage.get()) ?? [[0]],
  });

  constructor() {
    effect(() => {
      if (this.dataResource.hasValue()) {
        this.dataStorage.set(this.dataResource.value());
      }
    });
  }
}
