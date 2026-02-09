// ========================================
// Profile Type Definition
// ========================================
// ไฟล์นี้กำหนดโครงสร้างข้อมูล (Type) ของ Profile
// ใช้สำหรับ type-checking เพื่อให้แน่ใจว่าข้อมูล Profile มีครบถ้วนและถูกต้อง

// interface Profile กำหนดโครงสร้างของข้อมูลนักศึกษา
export interface Profile {
  // รหัสนักศึกษา (readonly = เมื่อสร้างแล้วแก้ไขไม่ได้)
  readonly studentId: string;

  // ชื่อจริง
  readonly firstname: string;

  // นามสกุล
  readonly lastname: string;

  // อายุ (เป็น number)
  readonly age: number;

  // ประวัติส่วนตัว/ชีวประวัติ
  readonly autobiography: string;

  // รายชื่อเพื่อน (เป็น array ของ string และเป็น readonly array)
  // readonly string[] = array ที่เปลี่ยนแปลงค่าไม่ได้หลังสร้าง
  readonly friends: readonly string[];
}
