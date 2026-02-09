// ========================================
// Entry Point ของ Angular Application
// ========================================
// ไฟล์นี้คือจุดเริ่มต้นของแอปพลิเคชัน Angular
// ทำหน้าที่ bootstrap (เริ่มต้น) Angular application

// นำเข้าฟังก์ชัน bootstrapApplication สำหรับเริ่มต้น standalone application
import { bootstrapApplication } from '@angular/platform-browser';
// นำเข้า configuration object ที่มีการตั้งค่า providers
import { appConfig } from './app/app.config';
// นำเข้า root component ของแอปพลิเคชัน
import { App } from './app/app';

// เริ่มต้นแอปพลิเคชันด้วย App component และ appConfig
// bootstrapApplication จะ:
// 1. สร้าง App component
// 2. ตั้งค่า providers ตาม appConfig
// 3. แสดงผล component ใน index.html (ที่ตำแหน่ง <app-root>)
bootstrapApplication(App, appConfig)
  // .catch() จะจับ error หากมีปัญหาในการเริ่มต้นแอปพลิเคชัน
  .catch((err) => console.error(err));
