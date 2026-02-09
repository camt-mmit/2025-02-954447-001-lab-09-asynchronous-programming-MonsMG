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

  // Flag เพื่อป้องกัน race condition ระหว่าง loadData กับ effect
  private isInitialized = false;

  // Helper สร้าง ID
  private generateId() {
    return Math.random().toString(36).substring(2, 11);
  }

  // สร้าง signal โดยมีค่าเริ่มต้นเป็น section เปล่า
  model = signal<DynamicSection>([]);

  constructor() {
    // โหลดข้อมูลจาก storage ก่อน
    this.loadData();

    // อัปเดต storage ทุกครั้งที่ model มีการเปลี่ยนแปลง
    effect(() => {
      const data = this.model();
      // บันทึกข้อมูลเฉพาะเมื่อโหลดข้อมูลเริ่มต้นเสร็จแล้ว
      if (this.isInitialized) {
        this.storage.set(data);
      }
    });
  }

  // ฟังก์ชัน validate และแก้ไขข้อมูลให้ถูกต้อง
  private validateAndFixData(data: DynamicSection): DynamicSection {
    // ถ้าไม่มี data เลย หรือเป็น array เปล่า -> สร้างใหม่
    if (!data || data.length === 0) {
      return createDynamicSection();
    }

    // ตรวจสอบทุก section ว่ามี numbers อย่างน้อย 1 item
    return data.map((section) => {
      // ถ้า section ไม่มี numbers หรือ numbers เป็น array เปล่า -> เพิ่ม 1 item เข้าไป
      if (!section.numbers || section.numbers.length === 0) {
        return {
          ...section,
          numbers: [{ id: this.generateId(), value: 0 }],
        };
      }
      return section;
    });
  }

  // ฟังก์ชันโหลดข้อมูลจาก storage (async)
  async loadData() {
    const data = await this.storage.get();
    // ใช้ฟังก์ชัน validate เพื่อแน่ใจว่าข้อมูลถูกต้อง
    const validData = this.validateAndFixData(data || []);
    this.model.set(validData);

    // ตั้งค่า flag เพื่อให้ effect เริ่มบันทึกข้อมูลได้
    this.isInitialized = true;
  }

  addSection() {
    this.model.update((current) => [
      ...current,
      { id: this.generateId(), numbers: [{ id: this.generateId(), value: 0 }] },
    ]);
  }

  removeSection(index: number) {
    if (this.model().length <= 1) return;
    this.model.update((current) => current.filter((_, i) => i !== index));
  }

  addNumber(sectionIndex: number) {
    this.model.update((current) => {
      // ใช้ map เพื่อสร้าง Array ใหม่และ Object ใหม่เฉพาะตัวที่ถูกแก้ไข (Immutable Pattern)
      return current.map((section, i) => {
        if (i !== sectionIndex) return section; // ตัวอื่นใช้ของเดิม
        return {
          ...section,
          numbers: [...section.numbers, { id: this.generateId(), value: 0 }],
        };
      });
    });
  }

  removeNumber(sectionIndex: number, numberIndex: number) {
    // 1. แก้ไข: เช็ค length ที่ .numbers ไม่ใช่ที่ section
    if (this.model()[sectionIndex].numbers.length <= 1) return;

    this.model.update((current) => {
      return current.map((section, i) => {
        if (i !== sectionIndex) return section;
        // 2. แก้ไข: filter ที่ .numbers
        return {
          ...section,
          numbers: section.numbers.filter((_, nIndex) => nIndex !== numberIndex),
        };
      });
    });
  }

  updateNumber(sectionIndex: number, numberIndex: number, value: number) {
    this.model.update((current) => {
      return current.map((section, sIdx) => {
        if (sIdx !== sectionIndex) return section;
        // สร้าง object ใหม่เพื่อความปลอดภัย (Immutability)
        return {
          ...section,
          numbers: section.numbers.map((num, nIdx) => {
            if (nIdx !== numberIndex) return num;
            return { ...num, value: Number(value) }; // อัปเดตค่าโดยสร้าง object ใหม่
          }),
        };
      });
    });
  }

  getSum(numbers: any[]): number {
    // ใส่ Type guard กัน error เผื่อ value เป็น undefined
    return numbers.reduce((a, b) => a + (Number(b.value) || 0), 0);
  }

  canRemoveSection(): boolean {
    return this.model().length > 1;
  }

  canRemoveNumber(sectionIndex: number): boolean {
    // 3. แก้ไข: เช็ค length ที่ .numbers
    const section = this.model()[sectionIndex];
    return section && section.numbers.length > 1;
  }
}
