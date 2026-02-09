import { DynamicSection } from './types';

// สร้างฟังก์ชันสุ่ม ID ไว้ใช้ในนี้ด้วย (หรือจะ import มาก็ได้)
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function createDynamicSection(): DynamicSection {
  // คืนค่าเริ่มต้น: 1 Section, มีเลข 0 หนึ่งตัว (พร้อม ID)
  return [
    {
      id: generateId(),
      numbers: [
        { id: generateId(), value: 0 }
      ]
    }
  ];
}
