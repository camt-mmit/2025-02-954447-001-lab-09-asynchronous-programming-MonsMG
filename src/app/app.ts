// ========================================
// Root Component (App Component)
// ========================================
// ไฟล์นี้เป็น component หลักของแอปพลิเคชัน
// ทุก component อื่นๆ จะแสดงผลผ่าน component นี้

// นำเข้า Component decorator และ signal function
import { Component, signal } from '@angular/core';
// นำเข้า router directives สำหรับการนำทาง
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// @Component decorator กำหนดข้อมูล metadata ของ component
@Component({
  // selector คือชื่อ HTML tag ที่ใช้เรียก component นี้
  // ใน index.html จะมี <app-root></app-root>
  selector: 'app-root',

  // imports คือ modules/components ที่ component นี้ต้องการใช้
  // (ใช้ได้เฉพาะ standalone components เท่านั้น)
  imports: [
    RouterOutlet, // แสดง component ตาม route ที่ active
    RouterLink, // สร้างลิงก์สำหรับนำทางไปยัง route อื่น
    RouterLinkActive, // เพิ่ม CSS class เมื่อ route นั้นๆ active
  ],

  // templateUrl คือ path ไปยังไฟล์ HTML template
  templateUrl: './app.html',

  // styleUrl คือ path ไปยังไฟล์ SCSS สำหรับ styling
  styleUrl: './app.scss',
})
export class App {
  // title เป็น signal ที่เก็บชื่อของแอป
  // signal คือ reactive value ที่ Angular จะ track การเปลี่ยนแปลง
  // protected readonly = สามารถเข้าถึงได้จาก template แต่เปลี่ยนค่าไม่ได้
  protected readonly title = signal('week9');
}
