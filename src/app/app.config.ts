// ========================================
// Application Configuration
// ========================================
// ไฟล์นี้กำหนดการตั้งค่าหลักของ Angular application
// เช่น routing, error handling, และ services ที่ต้องการใช้ทั้งแอป

// นำเข้า ApplicationConfig type และ provideBrowserGlobalErrorListeners function
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
// นำเข้า provideRouter สำหรับตั้งค่า routing
import { provideRouter } from '@angular/router';

// นำเข้า routes configuration จาก app.routes.ts
import { routes } from './app.routes';

// สร้าง configuration object สำหรับแอปพลิเคชัน
export const appConfig: ApplicationConfig = {
  // providers คือ array ของ services และ configuration
  // ที่ Angular จะ inject ให้กับทุก component ในแอป
  providers: [
    // ตั้งค่าให้ Angular จับ errors ที่เกิดขึ้นใน browser
    // และ handle ผ่าน global error handler
    provideBrowserGlobalErrorListeners(),

    // ตั้งค่า router ให้ใช้ routes ที่กำหนดไว้
    // provideRouter จะทำให้ Angular รู้จักทุก route ในแอป
    provideRouter(routes),
  ],
};
