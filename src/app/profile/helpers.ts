// ========================================
// Profile Helper Functions
// ========================================
// ไฟล์นี้มีฟังก์ชันช่วยสร้างข้อมูล Profile และ Friend
// ใช้เป็น Factory Functions เพื่อสร้าง default values

// นำเข้า Profile type
import { Profile } from './types';

// ฟังก์ชันสร้างชื่อเพื่อนเปล่า
// return: string ว่างเปล่า (ใช้เป็นค่าเริ่มต้น)
export function createFriend(): string {
  return '';
}

// ฟังก์ชันสร้าง Profile object พร้อมค่าเริ่มต้น
// return: Profile object ที่มีค่าเริ่มต้นทุก field
export function createProfile(): Profile {
  return {
    // ค่าเริ่มต้นของรหัสนักศึกษา (string ว่าง)
    studentId: '',

    // ค่าเริ่มต้นของชื่อ (string ว่าง)
    firstname: '',

    // ค่าเริ่มต้นของนามสกุล (string ว่าง)
    lastname: '',

    // ค่าเริ่มต้นของอายุ (0)
    age: 0,

    // ค่าเริ่มต้นของชีวประวัติ (string ว่าง)
    autobiography: '',

    // ค่าเริ่มต้นของรายชื่อเพื่อน (array ที่มี 1 ตัว คือ string ว่าง)
    friends: [createFriend()],
  };
}
