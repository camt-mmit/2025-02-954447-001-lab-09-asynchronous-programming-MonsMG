import { APP_ID, Injectable, inject } from '@angular/core';
import { DynamicSection } from '../types';

const KEY_ID = 'assignment-data'; // ตั้งชื่อ Key สำหรับ LocalStorage

@Injectable({
  providedIn: 'root',
})
export class DynamicSectionDataStorage {
  // สร้าง Key ให้ไม่ซ้ำกันแต่ละ App ID
  private readonly keyName = `${inject(APP_ID)}-${KEY_ID}`;

  // get() ต้องคืนค่าเป็น Promise
  async get(): Promise<DynamicSection | null> {
    const data = localStorage.getItem(this.keyName);
    // จำลองความหน่วง (optional) หรือคืนค่าเลย
    return data ? JSON.parse(data) : null;
  }

  // set() รับค่าและบันทึก
  async set(data: DynamicSection): Promise<void> {
    localStorage.setItem(this.keyName, JSON.stringify(data));
  }
}
