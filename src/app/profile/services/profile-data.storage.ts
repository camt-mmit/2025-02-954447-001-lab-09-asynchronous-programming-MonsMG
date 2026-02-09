// ========================================
// Profile Data Storage Service
// ========================================
// ไฟล์นี้เป็น Angular Service สำหรับจัดเก็บและดึง Profile data
// โดยใช้ localStorage ของ browser (ข้อมูลจะอยู่ถาวรแม้ปิด browser)

// นำเข้า decorators และ functions ที่จำเป็น
import { Injectable, APP_ID, inject } from '@angular/core';
// นำเข้า Profile type
import { Profile } from '../types';

// กำหนด key สำหรับเก็บข้อมูลใน localStorage
const keyId = 'profile-data';

// @Injectable decorator ทำให้ class นี้สามารถถูก inject เป็น dependency ได้
@Injectable({
  // providedIn: 'root' = service นี้เป็น singleton ใช้ร่วมกันทั้งแอป
  // Angular จะสร้าง instance เดียว และ provide ให้ทุก component
  providedIn: 'root',
})
export class ProfileDataStorage {
  // สร้าง key name ที่ unique โดยใช้ APP_ID + keyId
  // inject(APP_ID) = ดึง APP_ID จาก Angular DI system
  // as const = บอก TypeScript ว่าค่านี้เป็น constant ที่ไม่เปลี่ยน
  private readonly keyName = `${inject(APP_ID)}-${keyId}` as const;

  // ฟังก์ชันดึงข้อมูล Profile จาก localStorage
  // async = ฟังก์ชันนี้ทำงานแบบ asynchronous
  // Promise<Profile|null> = return ค่า Profile หรือ null (ถ้าไม่มีข้อมูล)
  async get(): Promise<Profile | null> {
    // localStorage.getItem() ดึงข้อมูลจาก localStorage ตาม key
    // ?? 'null' = ถ้าไม่มีข้อมูลให้ใช้ 'null' แทน
    // JSON.parse() แปลง JSON string กลับเป็น object
    return JSON.parse(localStorage.getItem(this.keyName) ?? 'null');
  }

  // ฟังก์ชันบันทึกข้อมูล Profile ลง localStorage
  // Promise<void> = ไม่ return ค่าอะไร (return void)
  async set(data: Profile): Promise<void> {
    // JSON.stringify() แปลง Profile object เป็น JSON string
    // localStorage.setItem() บันทึกข้อมูลลง localStorage
    return localStorage.setItem(this.keyName, JSON.stringify(data));
  }
}
