import { ChangeDetectionStrategy, Component, signal, inject, effect, computed, model } from '@angular/core';
import { DynamicSection } from '../../types';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';
import { form, FormField } from '@angular/forms/signals';
import { DecimalPipe, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-dynamic-section-form',
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  private storage = inject(DynamicSectionDataStorage);
  sumResult = computed(() => this.sectionsForm().value().map((section) => section.reduce((a, b) => a + b, 0)));
  // สร้าง signal โดยมีค่าเริ่มต้นเป็น section เปล่า
  model = model.required<DynamicSection>();

  protected readonly sectionsForm = form(this.model);

  addSection() {
    this.model.update((current) => [...current, [0]]);
  }

  removeSection(index: number) {
    if (this.model().length === 1) return;
    this.model.update((current) => current.filter((_, i) => i !== index));
  }

  addNumber(sectionIndex: number) {
    this.model.update((current) => {
      // Clone array เพื่อความเป็น Immutable
      return current.map((section, i) => {
        if (i !== sectionIndex) return section;

        // เพิ่ม Number ใหม่ใน Section นี้
        return [...section, 0];
      });
    });
  }

  removeNumber(sectionIndex: number, numberIndex: number) {
    // 1. แก้ไข: เช็ค length ที่ .numbers ไม่ใช่ที่ section
    if (this.model()[sectionIndex].length <= 1) return;

    this.model.update((current) => {
      return current.map((section, i) => {
        if (i !== sectionIndex) return section;
        // 2. แก้ไข: filter ที่ .numbers
        return section.filter((_, nIndex) => nIndex !== numberIndex);
      });
    });
  }
}
