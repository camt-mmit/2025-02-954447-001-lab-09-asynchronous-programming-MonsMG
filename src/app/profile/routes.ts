// ========================================
// Profile Module Routing
// ========================================
// ไฟล์นี้กำหนด routes สำหรับ Profile feature module
// มี nested routes (children) สำหรับการดูและแก้ไข profile

// นำเข้า Routes type
import { Routes } from '@angular/router';
// นำเข้า components ที่ใช้ใน routes
import { ProfileRoot } from './pages/profile-root/profile-root';
import { ProfileFormPage } from './pages/profile-form-page/profile-form-page';
import { ProfileViewPage } from './pages/profile-view-page/profile-view-page';

// export default เพื่อใช้กับ lazy loading (loadChildren)
export default [
  {
    // path: '' คือ base path ของ profile module (เข้าผ่าน /profile)
    path: '',

    // component: ProfileRoot เป็น layout component หลัก
    // มี <router-outlet> สำหรับแสดง children routes
    component: ProfileRoot,

    // children: routes ย่อยที่แสดงภายใน ProfileRoot
    children: [
      // เมื่อเข้า /profile (ไม่มี path ต่อท้าย) ให้ redirect ไปที่ /profile/view
      { path: '', redirectTo: 'view', pathMatch: 'full' },

      // /profile/view - แสดงหน้าดู profile
      { path: 'view', component: ProfileViewPage },

      // /profile/form - แสดงหน้าแก้ไข/สร้าง profile
      { path: 'form', component: ProfileFormPage },
    ],
  },
] as Routes;
