// ========================================
// Main Routing Configuration
// ========================================
// ไฟล์นี้กำหนด routes หลักของแอปพลิเคชัน
// Angular Router จะใช้ routes นี้ในการนำทางระหว่างหน้าต่างๆ

// นำเข้า Routes type จาก Angular router
import { Routes } from '@angular/router';

// สร้าง array ของ route configurations
export const routes: Routes = [
  {
    // path: '' หมายถึง root path (http://localhost:4200/)
    path: '',

    // redirectTo: เมื่อเข้า path นี้จะ redirect ไปยัง 'profile'
    redirectTo: 'profile',

    // pathMatch: 'full' หมายถึง URL ต้องตรงกับ path ทุกตัวอักษร
    // (ถ้าใช้ 'prefix' จะตรงแค่ส่วนต้นก็พอ)
    pathMatch: 'full',
  },
  {
    // path: 'profile' คือ URL path (http://localhost:4200/profile)
    path: 'profile',

    // loadChildren: lazy loading - โหลด routes เมื่อจำเป็นเท่านั้น
    // import('./profile/routes') จะโหลดไฟล์ routes.ts จาก profile folder
    // ช่วยให้แอปโหลดเร็วขึ้น เพราะไม่ต้องโหลดทุก route ตอนเริ่มต้น
    loadChildren: () => import('./profile/routes'),
  },
  {
    path: 'assignment',
    loadChildren: () => import('./assignment/routes'),
  }
];
