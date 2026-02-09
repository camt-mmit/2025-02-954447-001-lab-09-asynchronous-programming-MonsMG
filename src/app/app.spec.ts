// ========================================
// App Component Unit Tests
// ========================================
// ไฟล์นี้เป็น unit test สำหรับ App component
// ใช้ Jasmine framework และ Angular Testing utilities

// นำเข้า TestBed สำหรับการตั้งค่า testing environment
import { TestBed } from '@angular/core/testing';
// นำเข้า App component ที่ต้องการทดสอบ
import { App } from './app';

// describe() กำหนด test suite (กลุ่มของ tests)
describe('App', () => {
  // beforeEach() ทำงานก่อนทุก test case
  // async = รอให้ async operations เสร็จก่อน
  beforeEach(async () => {
    // configureTestingModule() ตั้งค่า testing module
    await TestBed.configureTestingModule({
      // imports: นำเข้า App component (standalone component)
      imports: [App],
    }).compileComponents(); // compileComponents() compile templates และ styles
  });

  // it() กำหนด test case แต่ละอัน
  // Test Case 1: ตรวจสอบว่า App component ถูกสร้างได้
  it('should create the app', () => {
    // createComponent() สร้าง component instance สำหรับทดสอบ
    const fixture = TestBed.createComponent(App);

    // componentInstance = ดึง component instance จาก fixture
    const app = fixture.componentInstance;

    // expect().toBeTruthy() = ตรวจสอบว่า app ไม่เป็น null/undefined
    expect(app).toBeTruthy();
  });

  // Test Case 2: ตรวจสอบว่า title ถูก render ในหน้าเว็บ
  it('should render title', async () => {
    // สร้าง component fixture
    const fixture = TestBed.createComponent(App);

    // whenStable() รอให้ async operations เสร็จทั้งหมด
    await fixture.whenStable();

    // nativeElement = ดึง DOM element จาก fixture
    const compiled = fixture.nativeElement as HTMLElement;

    // querySelector() หา h1 element และตรวจสอบ textContent
    // expect().toContain() = ตรวจสอบว่า text มีคำว่า 'Hello, week9'
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, week9');
  });
});
