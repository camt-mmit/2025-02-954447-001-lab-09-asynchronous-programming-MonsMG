import { ChangeDetectionStrategy, Component, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicSection } from '../../types';
import { DynamicSectionDataStorage } from '../../services/dynamic-section-data.storage';
import { createDynamicSection } from '../../helpers';

@Component({
  selector: 'app-dynamic-section-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  private storage = inject(DynamicSectionDataStorage);

  model = signal<DynamicSection>([]);

  constructor() {
    this.loadData();

    // Auto-save: บันทึกอัตโนมัติเมื่อ model เปลี่ยนแปลง
    effect(() => {
      const data = this.model();
      // บันทึกข้อมูลทุกครั้งที่มีการเปลี่ยนแปลง
      if (data.length > 0) {
        this.storage.set(data);
      }
    });
  }

  async loadData() {
    const data = await this.storage.get();
    // ถ้าไม่มีข้อมูล หรือข้อมูลว่างเปล่า ให้สร้างข้อมูลเริ่มต้น
    this.model.set(data && data.length > 0 ? data : createDynamicSection());
  }

  addSection() {
    this.model.update((current) => [...current, [0]]); // เพิ่ม section ใหม่พร้อม number 0
  }

  removeSection(index: number) {
    // ป้องกันการลบถ้าเหลือ 1 section
    if (this.model().length <= 1) return;

    this.model.update((current) => current.filter((_, i) => i !== index));
  }

  addNumber(sectionIndex: number) {
    this.model.update((current) => {
      const newSections = [...current];
      newSections[sectionIndex] = [...newSections[sectionIndex], 0];
      return newSections;
    });
  }

  removeNumber(sectionIndex: number, numberIndex: number) {
    // ป้องกันการลบถ้าใน section นั้นเหลือ 1 number
    if (this.model()[sectionIndex].length <= 1) return;

    this.model.update((current) => {
      const newSections = [...current];
      newSections[sectionIndex] = newSections[sectionIndex].filter((_, i) => i !== numberIndex);
      return newSections;
    });
  }

  updateNumber(sectionIndex: number, numberIndex: number, value: number) {
    this.model.update((current) => {
      const newSections = [...current];
      const newNumbers = [...newSections[sectionIndex]];
      newNumbers[numberIndex] = Number(value);
      newSections[sectionIndex] = newNumbers;
      return newSections;
    });
  }

  getSum(numbers: readonly number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
  }

  // Helper methods สำหรับ template ตรวจสอบว่าสามารถลบได้หรือไม่
  canRemoveSection(): boolean {
    return this.model().length > 1;
  }

  canRemoveNumber(sectionIndex: number): boolean {
    return this.model()[sectionIndex].length > 1;
  }
}
